import type { JSX } from 'react';
import Link from 'next/link';
import type { Guide } from '@opensteps/types';
import { formatLeone, formatDuration, formatDate } from '@/lib/format';
import TrustBar from '@/components/ui/TrustBar';

export default function GuideCard({ guide }: { guide: Guide }): JSX.Element {
  const href = `/${guide.country}/guide/${guide.slug}`;
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--color-surface3)] hover:border-[var(--color-green)] hover:shadow-sm transition-all"
    >
      <div className="grow min-w-0">
        <div className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors truncate">
          {guide.title}
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-xs font-mono text-[var(--color-ink-3)]">
            {guide.steps_count} steps
          </span>
          <span className="text-xs font-mono text-[var(--color-ink-3)]">
            {formatDuration(guide.duration_days)}
          </span>
          <span className="text-xs font-mono text-[var(--color-ink-3)]">
            {formatLeone(guide.total_cost)}
          </span>
          {guide.last_verified_at && (
            <span className="text-[10px] font-mono text-[var(--color-green)] bg-[var(--color-green-soft)] px-1.5 py-0.5 rounded-full">
              ✓ {formatDate(guide.last_verified_at)}
            </span>
          )}
        </div>
        <div className="mt-2 w-32">
          <TrustBar score={guide.trust_score} />
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-mono text-[var(--color-ink-3)]">
          {guide.follower_count.toLocaleString('en-SL')} following
        </div>
        <div className="text-lg font-serif text-[var(--color-green)] mt-1">
          {guide.trust_score.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
