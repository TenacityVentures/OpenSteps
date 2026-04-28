import type { JSX } from 'react';
import Link from 'next/link';
import type { Guide } from '@opensteps/types';

type RelatedGuide = Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'>;

export default function RelatedGuides({
  guides,
  country = 'sl',
}: {
  guides: RelatedGuide[];
  country?: string;
}): JSX.Element | null {
  if (guides.length === 0) return null;
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-2">
        Related
      </div>
      <ul className="space-y-1">
        {guides.map((g) => (
          <li key={g.id}>
            <Link
              href={`/${country}/guide/${g.slug}`}
              className="text-sm text-[var(--color-ink-2)] hover:text-[var(--color-green)] transition-colors"
            >
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
