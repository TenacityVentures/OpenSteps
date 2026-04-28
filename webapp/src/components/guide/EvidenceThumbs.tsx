import type { JSX } from 'react';
import Link from 'next/link';
import type { Evidence } from '@opensteps/types';

const TYPE_ICON: Record<string, string> = {
  receipt: '🧾',
  form: '📄',
  photo: '📷',
};

export default function EvidenceThumbs({
  evidence,
  guideSlug,
}: {
  evidence: Evidence[];
  guideSlug: string;
}): JSX.Element {
  const shown = evidence.slice(0, 6);
  const overflow = evidence.length - shown.length;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)]">
          Evidence · {evidence.length}
        </h2>
        <Link
          href={`/sl/${guideSlug}/evidence`}
          className="text-xs text-[var(--color-green)] hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {shown.map((ev) => (
          <div
            key={ev.id}
            className="aspect-square rounded-lg bg-[var(--color-surface2)] border border-[var(--color-surface3)] flex items-center justify-center text-2xl"
          >
            {TYPE_ICON[ev.type] ?? '📎'}
          </div>
        ))}
        {overflow > 0 && (
          <Link
            href={`/sl/${guideSlug}/evidence`}
            className="aspect-square rounded-lg bg-[var(--color-surface3)] border border-[var(--color-surface3)] flex items-center justify-center text-sm font-mono text-[var(--color-ink-3)] hover:bg-[var(--color-surface2)] transition-colors"
          >
            +{overflow}
          </Link>
        )}
      </div>
    </section>
  );
}
