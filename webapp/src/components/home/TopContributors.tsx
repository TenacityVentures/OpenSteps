'use client'

import type { JSX } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Verifier } from '@opensteps/types';

function extractCountry(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return match?.[1] ?? 'sl';
}

export function TopContributors({ verifiers }: { verifiers: Verifier[] }): JSX.Element {
  const pathname = usePathname();
  const country = extractCountry(pathname);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)]">
          Top contributors
        </h3>
        <Link href={`/${country}/leaderboard`} className="text-xs text-[var(--color-green)] hover:underline">
          See all →
        </Link>
      </div>
      <div className="space-y-2">
        {verifiers.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[var(--color-surface3)]"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {v.display_name[0]?.toUpperCase()}
            </div>
            <div className="grow min-w-0">
              <div className="font-semibold text-sm text-[var(--color-ink)] truncate">
                {v.display_name}
              </div>
              <div className="text-xs font-mono text-[var(--color-ink-3)]">
                {v.verification_count} verified
              </div>
            </div>
            {v.role === 'editor' ? (
              <span className="text-[9px] font-mono tracking-widest border border-[var(--color-ink-3)] text-[var(--color-ink-3)] px-1.5 py-0.5 rounded uppercase shrink-0">
                Editor
              </span>
            ) : (
              <span className="text-xs font-mono text-[var(--color-green)] font-semibold shrink-0">
                {v.accuracy_pct}%
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
