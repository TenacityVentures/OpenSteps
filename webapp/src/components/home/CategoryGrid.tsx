import type { JSX } from 'react';
import Link from 'next/link';
import type { Category } from '@opensteps/types';
import { CATEGORY_MAP } from '@opensteps/constants';

export default function CategoryGrid({ categories, country }: { categories: Category[]; country: string }): JSX.Element {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {categories.map((cat) => {
        const meta = CATEGORY_MAP[cat.key];
        if (!meta) return null;
        return (
          <Link
            key={cat.key}
            href={`/${country}/category/${cat.key}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white border border-[var(--color-surface3)] hover:border-[var(--color-green)] hover:shadow-sm transition-all text-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-[var(--color-green)] group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d={meta.iconPaths} />
            </svg>
            <div>
              <div className="text-xs font-semibold text-[var(--color-ink)] leading-tight">
                {meta.label.split(' ').slice(0, 2).join(' ')}
              </div>
              {cat.count > 0 && (
                <div className="text-[10px] font-mono text-[var(--color-ink-3)] mt-0.5">
                  {cat.count} guide{cat.count !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
