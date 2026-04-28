import type { JSX } from 'react';
import type { Guide } from '@opensteps/types';
import { formatLeone, formatDuration } from '@opensteps/types';

const CATEGORY_LABEL: Record<string, string> = {
  business: 'Business',
  id: 'ID & docs',
  transport: 'Transport',
  health: 'Health',
  education: 'Education',
  tax: 'Tax',
  property: 'Property',
  travel: 'Travel',
};

type PendingGuide = Pick<Guide, 'id' | 'slug' | 'title' | 'category' | 'description' | 'steps_count' | 'total_cost' | 'duration_days' | 'created_at'>;

export function GuideCard({ guide, index, total }: { guide: PendingGuide; index: number; total: number }): JSX.Element {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-surface3)] shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-green-tint)] text-[var(--color-green)] border border-[var(--color-green-soft)]">
            {CATEGORY_LABEL[guide.category] ?? guide.category}
          </span>
          <h2 className="text-xl font-bold text-[var(--color-ink)] leading-snug">
            {guide.title}
          </h2>
        </div>
        <span className="shrink-0 text-xs font-mono text-[var(--color-ink-4)]">
          {index + 1} / {total}
        </span>
      </div>

      {/* Description */}
      {guide.description && (
        <p className="text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-3">
          {guide.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Stat label="Steps" value={String(guide.steps_count)} />
        {guide.total_cost > 0 && (
          <Stat label="Total cost" value={formatLeone(guide.total_cost)} />
        )}
        {guide.duration_days && (
          <Stat label="Duration" value={formatDuration(guide.duration_days)} />
        )}
        <Stat
          label="Submitted"
          value={new Date(guide.created_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">{label}</span>
      <span className="text-sm font-medium text-[var(--color-ink-2)]">{value}</span>
    </div>
  );
}
