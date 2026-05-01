import type { JSX } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getTopVerifiers } from '@opensteps/supabase';
import { CATEGORY_MAP, COUNTRY_MAP } from '@opensteps/constants';
import type { CategoryKey, CountryCode, Verifier } from '@opensteps/types';
import { formatLeone } from '@opensteps/types';
import { StatsBlock } from '@/components/leaderboard/StatsBlock';

export const metadata: Metadata = { title: 'Leaderboard — OpenSteps' };
export const revalidate = 120;

const MEDAL = ['🥇', '🥈', '🥉'];

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'lg' ? 'w-14 h-14 text-xl' : size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  return (
    <div className={`${s} rounded-full bg-[var(--color-green)] text-white font-bold flex items-center justify-center shrink-0`}>
      {name[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  if (role !== 'editor') return null;
  return (
    <span className="text-[8px] font-mono tracking-widest border border-[var(--color-ink-3)] text-[var(--color-ink-3)] px-1 py-0.5 rounded uppercase">
      Ed
    </span>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)] mb-4">{children}</h2>
  );
}

function TrustBar({ score }: { score: number }) {
  const pct = Math.round((score / 10) * 100);
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="flex-1 h-1.5 rounded-full bg-[var(--color-surface3)] overflow-hidden">
        <div className="h-full rounded-full bg-[var(--color-green)]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-[var(--color-green)] shrink-0">{score.toFixed(1)}</span>
    </div>
  );
}

// Top-3 podium
function Podium({ verifiers }: { verifiers: Verifier[] }) {
  const top = verifiers.slice(0, 3);
  // Reorder for visual: 2nd | 1st | 3rd
  const order = [top[1], top[0], top[2]].filter(Boolean) as Verifier[];
  const heights = [top[1] ? 'pt-4' : '', '', 'pt-8'];
  const realRanks = [2, 1, 3];

  return (
    <div className="flex items-end justify-center gap-3 py-4">
      {order.map((v, i) => {
        const rank = realRanks[i]!;
        const isFirst = rank === 1;
        return (
          <div key={v.id} className={`flex flex-col items-center gap-2 ${heights[i]}`}>
            <span className="text-lg">{MEDAL[rank - 1]}</span>
            <Avatar name={v.display_name} size={isFirst ? 'lg' : 'md'} />
            <div className="text-center">
              <p className={`font-semibold text-[var(--color-ink)] ${isFirst ? 'text-sm' : 'text-xs'} max-w-[72px] truncate`}>
                {v.display_name}
              </p>
              <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                {v.verification_count} verified
              </p>
            </div>
            <div className={[
              'w-full rounded-t-lg text-center py-1',
              isFirst ? 'bg-amber-400 h-16' : rank === 2 ? 'bg-[var(--color-surface3)] h-10' : 'bg-[var(--color-surface3)] h-6',
            ].join(' ')} />
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  params: Promise<{ country: string }>;
}

export default async function LeaderboardPage({ params }: Props): Promise<JSX.Element> {
  const { country } = await params;
  const client = await createClient();

  const [
    verifiers,
    { data: topGuidesData },
    { data: topTipsData },
    { data: allTipsData },
    { count: totalVerifications },
    { count: totalTipCount },
    { count: totalGuideCount },
    { data: allGuideCountries },
  ] = await Promise.all([
    getTopVerifiers(client, 50),
    client.from('guides').select('id, title, slug, country, trust_score, follower_count, category').eq('published', true).order('trust_score', { ascending: false }).limit(8),
    client.from('tips').select('id, text, upvotes, guide_id, author_id').order('upvotes', { ascending: false }).limit(8),
    client.from('tips').select('author_id, upvotes').not('author_id', 'is', null),
    client.from('guide_verifications').select('*', { count: 'exact', head: true }),
    client.from('tips').select('*', { count: 'exact', head: true }),
    client.from('guides').select('*', { count: 'exact', head: true }).eq('published', true),
    client.from('guides').select('country').eq('published', true),
  ]);

  // Guide titles for top tips
  const tipGuideIds = [...new Set((topTipsData ?? []).map((t) => t.guide_id))];
  const { data: tipGuideTitles } = tipGuideIds.length > 0
    ? await client.from('guides').select('id, title, slug, country').in('id', tipGuideIds)
    : { data: [] };
  const guideById = Object.fromEntries((tipGuideTitles ?? []).map((g) => [g.id, g]));

  // Top tippers — group tips by author_id in JS
  type TipperStat = { id: string; tipCount: number; totalUpvotes: number; verifier: Verifier | undefined };
  const tipperMap: Record<string, { tipCount: number; totalUpvotes: number }> = {};
  for (const t of allTipsData ?? []) {
    const id = t.author_id as string;
    tipperMap[id] = {
      tipCount: (tipperMap[id]?.tipCount ?? 0) + 1,
      totalUpvotes: (tipperMap[id]?.totalUpvotes ?? 0) + (t.upvotes as number),
    };
  }
  const topTippers: TipperStat[] = Object.entries(tipperMap)
    .sort(([, a], [, b]) => b.tipCount - a.tipCount)
    .slice(0, 5)
    .map(([id, stats]) => ({ id, ...stats, verifier: verifiers.find((v) => v.id === id) }));

  // Country guide counts
  const countryCount: Record<string, number> = {};
  for (const g of allGuideCountries ?? []) {
    const c = g.country as string;
    countryCount[c] = (countryCount[c] ?? 0) + 1;
  }
  const countryRankings = Object.entries(countryCount)
    .sort(([, a], [, b]) => b - a)
    .map(([code, count]) => ({ code, count, meta: COUNTRY_MAP[code as CountryCode] }));

  // Editors
  const editors = verifiers.filter((v) => v.role === 'editor');
  const nonEditors = verifiers.filter((v) => v.role !== 'editor');

  const topGuides = topGuidesData ?? [];
  const topTips = topTipsData ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="space-y-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">Community</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Leaderboard</h1>
        <p className="text-sm text-[var(--color-ink-3)]">Everything happening on OpenSteps.</p>
      </div>

      {/* ── Platform stats ─────────────────────────────────────────────────── */}
      <StatsBlock stats={[
        { label: 'Guides', value: totalGuideCount ?? 0 },
        { label: 'Verifications', value: totalVerifications ?? 0 },
        { label: 'Contributors', value: verifiers.length },
        { label: 'Tips', value: totalTipCount ?? 0 },
      ]} />

      {/* ── Top Contributors ───────────────────────────────────────────────── */}
      <section>
        <SectionHeader>Top contributors</SectionHeader>

        {nonEditors.length >= 3 && <Podium verifiers={nonEditors} />}

        {/* Ranked list (rank 4+) */}
        <div className="mt-2 space-y-0 rounded-xl border border-[var(--color-surface3)] overflow-hidden">
          {nonEditors.slice(nonEditors.length >= 3 ? 3 : 0).map((v, i) => {
            const rank = (nonEditors.length >= 3 ? 3 : 0) + i + 1;
            return (
              <div key={v.id} className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--color-surface3)] last:border-0 hover:bg-[var(--color-surface2)] transition-colors">
                <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">{rank}</span>
                <Avatar name={v.display_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-ink)] truncate">{v.display_name}</p>
                  <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                    {v.verification_count} verified
                    {v.streak_weeks > 0 && ` · ${v.streak_weeks}w streak`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {(v.domains ?? []).slice(0, 2).map((d) => (
                    <span key={d} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-green-tint)] text-[var(--color-green)]">
                      {CATEGORY_MAP[d as CategoryKey]?.label.split(' ')[0] ?? d}
                    </span>
                  ))}
                </div>
                {v.accuracy_pct > 0 && (
                  <span className="text-xs font-mono text-[var(--color-ink-3)] shrink-0">{v.accuracy_pct}%</span>
                )}
              </div>
            );
          })}
          {nonEditors.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-ink-4)]">
              No verifications yet. <Link href={`/${country}/verify`} className="text-[var(--color-green)] hover:underline">Be first →</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Top Editors ────────────────────────────────────────────────────── */}
      {editors.length > 0 && (
        <section>
          <SectionHeader>Editors</SectionHeader>
          <div className="space-y-0 rounded-xl border border-[var(--color-surface3)] overflow-hidden">
            {editors.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--color-surface3)] last:border-0">
                <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">{i + 1}</span>
                <Avatar name={v.display_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-[var(--color-ink)] truncate">{v.display_name}</p>
                    <RoleBadge role={v.role} />
                  </div>
                  <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                    {v.verification_count} approvals
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Most Trusted Guides ────────────────────────────────────────────── */}
      {topGuides.length > 0 && (
        <section>
          <SectionHeader>Most trusted guides</SectionHeader>
          <div className="space-y-0 rounded-xl border border-[var(--color-surface3)] overflow-hidden">
            {topGuides.map((g, i) => (
              <Link
                key={g.id}
                href={`/${g.country}/guide/${g.slug}`}
                className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--color-surface3)] last:border-0 hover:bg-[var(--color-surface2)] transition-colors group"
              >
                <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">
                  {MEDAL[i] ?? `${i + 1}`}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors truncate">
                    {g.title}
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                    {CATEGORY_MAP[g.category as CategoryKey]?.label ?? g.category}
                    {g.follower_count > 0 && ` · ${g.follower_count} followers`}
                  </p>
                </div>
                <TrustBar score={g.trust_score} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Top Tips (most upvoted) ────────────────────────────────────────── */}
      {topTips.filter((t) => t.upvotes > 0).length > 0 && (
        <section>
          <SectionHeader>Most upvoted tips</SectionHeader>
          <div className="space-y-2">
            {topTips.filter((t) => t.upvotes > 0).map((t) => {
              const g = guideById[t.guide_id];
              return (
                <div key={t.id} className="bg-white rounded-xl border border-[var(--color-surface3)] px-4 py-3 flex items-start gap-3">
                  <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[var(--color-green)]" fill="currentColor">
                      <path d="M8 2l2 4h4l-3.3 2.4 1.3 4L8 10 4 12.4l1.3-4L2 6h4z" />
                    </svg>
                    <span className="text-xs font-mono font-bold text-[var(--color-green)]">{t.upvotes}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-2">{t.text}</p>
                    {g && (
                      <Link href={`/${g.country}/guide/${g.slug}`} className="text-[10px] font-mono text-[var(--color-ink-4)] hover:text-[var(--color-green)] transition-colors mt-0.5 inline-block">
                        {g.title}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Top Tippers ───────────────────────────────────────────────────── */}
      {topTippers.length > 0 && (
        <section>
          <SectionHeader>Top tippers</SectionHeader>
          <div className="space-y-0 rounded-xl border border-[var(--color-surface3)] overflow-hidden">
            {topTippers.map((t, i) => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--color-surface3)] last:border-0">
                <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">
                  {MEDAL[i] ?? `${i + 1}`}
                </span>
                <Avatar name={t.verifier?.display_name ?? '?'} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-ink)] truncate">
                    {t.verifier?.display_name ?? 'Anonymous'}
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                    {t.tipCount} tip{t.tipCount !== 1 ? 's' : ''} · {t.totalUpvotes} total upvotes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Country Rankings ──────────────────────────────────────────────── */}
      {countryRankings.length > 0 && (
        <section>
          <SectionHeader>Country rankings · guides published</SectionHeader>
          <div className="space-y-0 rounded-xl border border-[var(--color-surface3)] overflow-hidden">
            {countryRankings.map(({ code, count: cnt, meta }, i) => {
              const pct = Math.round((cnt / (countryRankings[0]?.count ?? 1)) * 100);
              return (
                <div key={code} className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--color-surface3)] last:border-0">
                  <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">{i + 1}</span>
                  <span className="text-xl shrink-0">{meta?.flag ?? '🌍'}</span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-medium text-[var(--color-ink)]">{meta?.name ?? code.toUpperCase()}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-[var(--color-surface3)] overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--color-green)]" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--color-ink-4)] shrink-0">{cnt} guide{cnt !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Recent activity feed ──────────────────────────────────────────── */}
      <section>
        <SectionHeader>Recent activity</SectionHeader>
        <div className="space-y-1 text-sm">
          <p className="text-[var(--color-ink-4)] text-xs font-mono">
            <Link href={`/${country}`} className="text-[var(--color-green)] hover:underline">Browse all guides →</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
