import type { JSX } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getTopVerifiers } from '@opensteps/supabase';
import { CATEGORY_MAP } from '@opensteps/constants';
import type { CategoryKey } from '@opensteps/types';

export const metadata: Metadata = { title: 'Leaderboard' };
export const revalidate = 300;

export default async function LeaderboardPage(): Promise<JSX.Element> {
  const client = await createClient();
  const verifiers = await getTopVerifiers(client, 50);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Community</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Top contributors</h1>
        <p className="text-sm text-[var(--color-ink-3)]">
          People who have verified, contributed, and improved guides.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block rounded-xl border border-[var(--color-surface3)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface2)]">
            <tr>
              {['#', 'Contributor', 'Role', 'Verifications', 'Accuracy', 'Domains', 'Streak'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-surface3)]">
            {verifiers.map((v, i) => (
              <tr key={v.id} className="hover:bg-[var(--color-surface2)] transition-colors">
                <td className="px-4 py-3 font-mono text-[var(--color-ink-4)] text-xs">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {v.display_name[0]?.toUpperCase()}
                    </div>
                    <span className="font-medium text-[var(--color-ink)]">{v.display_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {v.role === 'editor' ? (
                    <span className="text-[9px] font-mono tracking-widest border border-[var(--color-ink-3)] text-[var(--color-ink-3)] px-1.5 py-0.5 rounded uppercase">
                      Editor
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[var(--color-ink-4)]">Verifier</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-[var(--color-green)] font-semibold">
                  {v.verification_count}
                </td>
                <td className="px-4 py-3 font-mono text-[var(--color-ink-3)]">
                  {v.accuracy_pct > 0 ? `${v.accuracy_pct}%` : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(v.domains ?? []).slice(0, 3).map((d) => (
                      <span key={d} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-green-tint)] text-[var(--color-green)]">
                        {CATEGORY_MAP[d as CategoryKey]?.label ?? d}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[var(--color-ink-3)]">
                  {v.streak_weeks > 0 ? `${v.streak_weeks}w` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {verifiers.map((v, i) => (
          <div key={v.id} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--color-surface3)]">
            <span className="text-sm font-mono text-[var(--color-ink-4)] w-5 shrink-0">{i + 1}</span>
            <div className="w-10 h-10 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-sm font-bold shrink-0">
              {v.display_name[0]?.toUpperCase()}
            </div>
            <div className="grow min-w-0">
              <p className="font-semibold text-[var(--color-ink)] truncate">{v.display_name}</p>
              <p className="text-xs font-mono text-[var(--color-ink-3)]">
                {v.verification_count} verified · {v.accuracy_pct > 0 ? `${v.accuracy_pct}%` : '—'}
              </p>
            </div>
            {v.role === 'editor' && (
              <span className="text-[9px] font-mono border border-[var(--color-ink-3)] text-[var(--color-ink-3)] px-1.5 py-0.5 rounded uppercase shrink-0">
                Ed
              </span>
            )}
          </div>
        ))}
      </div>

      {verifiers.length === 0 && (
        <p className="text-sm text-[var(--color-ink-4)] italic text-center py-10">
          No contributors yet. Be the first to verify a guide!
        </p>
      )}
    </div>
  );
}
