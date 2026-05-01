import type { JSX } from 'react';
import Link from 'next/link';
import type { Guide } from '@opensteps/types';
import { formatLeone } from '@opensteps/types';

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

interface Props {
  guides: PendingGuide[];
  country: string;
}

export function PendingList({ guides, country }: Props): JSX.Element | null {
  if (guides.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
        All pending guides
      </h3>

      {/* Desktop table */}
      <div className="hidden sm:block rounded-xl border border-[var(--color-surface3)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface2)]">
            <tr>
              {['Title', 'Category', 'Steps', 'Cost', 'Submitted'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]"
                >
                  {h}
                </th>
              ))}
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-surface3)]">
            {guides.map((g) => (
              <tr
                key={g.id}
                className="hover:bg-[var(--color-surface2)] transition-colors cursor-pointer"
                onClick={() => { window.location.href = `/${country}/verify/${g.slug}`; }}
              >
                <td className="px-4 py-3 font-medium text-[var(--color-ink)] max-w-[200px] truncate">
                  <Link
                    href={`/${country}/verify/${g.slug}`}
                    className="hover:text-[var(--color-green)] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {g.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--color-ink-3)]">
                  {CATEGORY_LABEL[g.category] ?? g.category}
                </td>
                <td className="px-4 py-3 font-mono text-[var(--color-ink-3)]">{g.steps_count}</td>
                <td className="px-4 py-3 font-mono text-[var(--color-ink-3)]">
                  {g.total_cost > 0 ? formatLeone(g.total_cost) : '—'}
                </td>
                <td className="px-4 py-3 text-[var(--color-ink-4)]">
                  {new Date(g.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short',
                  })}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/${country}/verify/${g.slug}`}
                    className="text-xs text-[var(--color-green)] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden space-y-2">
        {guides.map((g) => (
          <Link
            key={g.id}
            href={`/${country}/verify/${g.slug}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-[var(--color-surface3)] hover:border-[var(--color-green)] transition-colors gap-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-ink)] truncate">{g.title}</p>
              <p className="text-xs text-[var(--color-ink-3)]">
                {CATEGORY_LABEL[g.category] ?? g.category} · {g.steps_count} steps
              </p>
            </div>
            <span className="shrink-0 text-xs text-[var(--color-green)]">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
