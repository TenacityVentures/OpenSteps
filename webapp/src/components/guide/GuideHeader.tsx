import type { Guide } from '@opensteps/types';
import { formatLeone, formatDuration, formatDate, formatTrustScore } from '@/lib/format';
import Badge from '@/components/ui/Badge';
import TrustBar from '@/components/ui/TrustBar';
import { CATEGORY_MAP } from '@opensteps/constants';

export default function GuideHeader({ guide }: { guide: Guide }) {
  const catMeta = CATEGORY_MAP[guide.category];

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-ink-3)]">
        <a href="/sl" className="hover:text-[var(--color-green)]">Sierra Leone</a>
        <span>/</span>
        <a href={`/sl/${guide.category}`} className="hover:text-[var(--color-green)]">
          {catMeta?.label ?? guide.category}
        </a>
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight">
        {guide.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="ok">
          {guide.steps_count} steps
        </Badge>
        <Badge variant="default">
          {formatDuration(guide.duration_days)}
        </Badge>
        <Badge variant="default">
          {formatLeone(guide.total_cost)} total
        </Badge>
        {guide.last_verified_at && (
          <Badge variant="ok">
            ✓ verified {formatDate(guide.last_verified_at)}
          </Badge>
        )}
      </div>

      {/* Trust score */}
      <div className="flex items-center gap-3 max-w-xs">
        <div className="text-sm font-mono text-[var(--color-ink-3)]">Trust</div>
        <TrustBar score={guide.trust_score} />
        <div className="text-sm font-mono text-[var(--color-green)] font-semibold">
          {formatTrustScore(guide.trust_score)}
        </div>
      </div>

      {guide.description && (
        <p className="text-[var(--color-ink-2)] max-w-2xl leading-relaxed">{guide.description}</p>
      )}
    </div>
  );
}
