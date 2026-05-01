'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { StatsBlock } from '@/components/leaderboard/StatsBlock';
import { CATEGORY_MAP } from '@opensteps/constants';
import type { CategoryKey, Verifier } from '@opensteps/types';
import type { CountryMeta } from '@opensteps/constants';

// ── Icons ─────────────────────────────────────────────────────────────────────

function CardsIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <line x1="4"  y1="1" x2="4"  y2="15" />
      <line x1="8"  y1="1" x2="8"  y2="15" />
      <line x1="12" y1="1" x2="12" y2="15" />
      <line x1="1" y1="4"  x2="15" y2="4"  />
      <line x1="1" y1="8"  x2="15" y2="8"  />
      <line x1="1" y1="12" x2="15" y2="12" />
    </svg>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

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

function Podium({ verifiers }: { verifiers: Verifier[] }) {
  const top = verifiers.slice(0, 3);
  const order = [top[1], top[0], top[2]].filter(Boolean) as Verifier[];
  const heights = [top[1] ? 'pt-4' : '', '', 'pt-8'];
  const realRanks = [2, 1, 3];
  const MEDAL = ['🥇', '🥈', '🥉'];

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
              'w-full rounded-t-lg py-1',
              isFirst ? 'bg-amber-400 h-16' : rank === 2 ? 'bg-[var(--color-surface3)] h-10' : 'bg-[var(--color-surface3)] h-6',
            ].join(' ')} />
          </div>
        );
      })}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface GuideRow {
  id: string;
  title: string;
  slug: string;
  country: string;
  trust_score: number;
  follower_count: number;
  category: string;
}

interface TipRow {
  id: string;
  text: string;
  upvotes: number;
  guide_id: string;
  author_id: string;
}

export interface TipperStat {
  id: string;
  tipCount: number;
  totalUpvotes: number;
  verifier: Verifier | undefined;
}

export interface CountryRankItem {
  code: string;
  count: number;
  meta: CountryMeta | undefined;
}

interface GuideRef {
  id: string;
  title: string;
  slug: string;
  country: string;
}

export interface LeaderboardProps {
  country: string;
  verifiers: Verifier[];
  editors: Verifier[];
  nonEditors: Verifier[];
  topGuides: GuideRow[];
  topTips: TipRow[];
  topTippers: TipperStat[];
  countryRankings: CountryRankItem[];
  guideById: Record<string, GuideRef>;
  totalGuideCount: number;
  totalVerifications: number;
  totalTipCount: number;
}

const MEDAL = ['🥇', '🥈', '🥉'];

const GRAPH_BG: React.CSSProperties = {
  backgroundImage: [
    'linear-gradient(var(--color-surface3) 1px, transparent 1px)',
    'linear-gradient(90deg, var(--color-surface3) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '22px 22px',
  backgroundColor: 'var(--color-bg)',
};

// ── Main component ─────────────────────────────────────────────────────────────

export function LeaderboardClient({
  country,
  verifiers,
  editors,
  nonEditors,
  topGuides,
  topTips,
  topTippers,
  countryRankings,
  guideById,
  totalGuideCount,
  totalVerifications,
  totalTipCount,
}: LeaderboardProps): JSX.Element {
  const [layout, setLayout] = useState<'cards' | 'graph'>('cards');
  const g = layout === 'graph';

  // Row / section helpers — bg fades in/out with transition-colors
  const rowBase = `flex items-center gap-3 px-4 py-3 border-b border-[var(--color-surface3)] last:border-0 transition-colors duration-300 ${g ? '' : 'bg-white'}`;
  const rowHover = `${rowBase} ${g ? 'hover:bg-black/[0.03]' : 'hover:bg-[var(--color-surface2)]'}`;
  const sectionShell = `rounded-xl border border-[var(--color-surface3)] overflow-hidden`;

  return (
    <div className="space-y-12">

      {/* ── Header + toggle ────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">Community</p>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">Leaderboard</h1>
          <p className="text-sm text-[var(--color-ink-3)]">Everything happening on OpenSteps.</p>
        </div>

        <button
          type="button"
          onClick={() => setLayout(l => (l === 'cards' ? 'graph' : 'cards'))}
          title={g ? 'Switch to card view' : 'Switch to graph view'}
          className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-ink-4)] hover:text-[var(--color-ink-2)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--color-surface2)] shrink-0 mt-1"
        >
          {g ? <CardsIcon /> : <GridIcon />}
          <span>{g ? 'Cards' : 'Graph'}</span>
        </button>
      </div>

      {/* ── Content — graph paper bg applied here ──────────────────────────── */}
      <div
        className="space-y-12 rounded-2xl transition-all duration-300"
        style={g ? { ...GRAPH_BG, padding: '1.5rem 1rem' } : {}}
      >

        {/* ── Platform stats ─────────────────────────────────────────────── */}
        <StatsBlock
          layout={layout}
          stats={[
            { label: 'Guides',        value: totalGuideCount },
            { label: 'Verifications', value: totalVerifications },
            { label: 'Contributors',  value: verifiers.length },
            { label: 'Tips',          value: totalTipCount },
          ]}
        />

        {/* ── Top Contributors ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader>Top contributors</SectionHeader>

          {nonEditors.length >= 3 && <Podium verifiers={nonEditors} />}

          <div className={sectionShell}>
            {nonEditors.slice(nonEditors.length >= 3 ? 3 : 0).map((v, i) => {
              const rank = (nonEditors.length >= 3 ? 3 : 0) + i + 1;
              return (
                <div key={v.id} className={rowHover}>
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
              <div className={`px-4 py-8 text-center text-sm text-[var(--color-ink-4)] transition-colors duration-300 ${g ? '' : 'bg-white'}`}>
                No verifications yet.{' '}
                <Link href={`/${country}/verify`} className="text-[var(--color-green)] hover:underline">
                  Be first →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── Editors ──────────────────────────────────────────────────────── */}
        {editors.length > 0 && (
          <section>
            <SectionHeader>Editors</SectionHeader>
            <div className={sectionShell}>
              {editors.map((v, i) => (
                <div key={v.id} className={rowBase}>
                  <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">{i + 1}</span>
                  <Avatar name={v.display_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-[var(--color-ink)] truncate">{v.display_name}</p>
                      <RoleBadge role={v.role} />
                    </div>
                    <p className="text-[10px] font-mono text-[var(--color-ink-4)]">{v.verification_count} approvals</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Most Trusted Guides ──────────────────────────────────────────── */}
        {topGuides.length > 0 && (
          <section>
            <SectionHeader>Most trusted guides</SectionHeader>
            <div className={sectionShell}>
              {topGuides.map((guide, i) => (
                <Link
                  key={guide.id}
                  href={`/${guide.country}/guide/${guide.slug}`}
                  className={`${rowHover} group`}
                >
                  <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">
                    {MEDAL[i] ?? `${i + 1}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors truncate">
                      {guide.title}
                    </p>
                    <p className="text-[10px] font-mono text-[var(--color-ink-4)]">
                      {CATEGORY_MAP[guide.category as CategoryKey]?.label ?? guide.category}
                      {guide.follower_count > 0 && ` · ${guide.follower_count} followers`}
                    </p>
                  </div>
                  <TrustBar score={guide.trust_score} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Most Upvoted Tips ────────────────────────────────────────────── */}
        {topTips.filter((t) => t.upvotes > 0).length > 0 && (
          <section>
            <SectionHeader>Most upvoted tips</SectionHeader>
            <div className="space-y-2">
              {topTips.filter((t) => t.upvotes > 0).map((t) => {
                const guide = guideById[t.guide_id];
                return (
                  <div
                    key={t.id}
                    className={`rounded-xl border border-[var(--color-surface3)] px-4 py-3 flex items-start gap-3 transition-colors duration-300 ${g ? '' : 'bg-white'}`}
                  >
                    <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[var(--color-green)]" fill="currentColor">
                        <path d="M8 2l2 4h4l-3.3 2.4 1.3 4L8 10 4 12.4l1.3-4L2 6h4z" />
                      </svg>
                      <span className="text-xs font-mono font-bold text-[var(--color-green)]">{t.upvotes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-2">{t.text}</p>
                      {guide && (
                        <Link
                          href={`/${guide.country}/guide/${guide.slug}`}
                          className="text-[10px] font-mono text-[var(--color-ink-4)] hover:text-[var(--color-green)] transition-colors mt-0.5 inline-block"
                        >
                          {guide.title}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Top Tippers ──────────────────────────────────────────────────── */}
        {topTippers.length > 0 && (
          <section>
            <SectionHeader>Top tippers</SectionHeader>
            <div className={sectionShell}>
              {topTippers.map((t, i) => (
                <div key={t.id} className={rowBase}>
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

        {/* ── Country Rankings ─────────────────────────────────────────────── */}
        {countryRankings.length > 0 && (
          <section>
            <SectionHeader>Country rankings · guides published</SectionHeader>
            <div className={sectionShell}>
              {countryRankings.map(({ code, count: cnt, meta }, i) => {
                const pct = Math.round((cnt / (countryRankings[0]?.count ?? 1)) * 100);
                return (
                  <div key={code} className={rowBase}>
                    <span className="text-xs font-mono text-[var(--color-ink-4)] w-5 shrink-0 text-right">{i + 1}</span>
                    <span className="text-xl shrink-0">{meta?.flag ?? '🌍'}</span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-medium text-[var(--color-ink)]">{meta?.name ?? code.toUpperCase()}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-[var(--color-surface3)] overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-green)]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-[var(--color-ink-4)] shrink-0">
                          {cnt} guide{cnt !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Recent activity ──────────────────────────────────────────────── */}
        <section>
          <SectionHeader>Recent activity</SectionHeader>
          <p className="text-xs font-mono text-[var(--color-ink-4)]">
            <Link href={`/${country}`} className="text-[var(--color-green)] hover:underline">
              Browse all guides →
            </Link>
          </p>
        </section>

      </div>
    </div>
  );
}
