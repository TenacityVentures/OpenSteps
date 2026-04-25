import type { DocumentNeeded } from '@opensteps/types';

export default function WhatToBring({ documents }: { documents: DocumentNeeded[] }) {
  const required = documents.filter((d) => d.required);
  const optional = documents.filter((d) => !d.required);

  return (
    <section className="p-5 rounded-xl border border-[var(--color-surface3)] bg-[var(--color-surface2)] space-y-3">
      <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)]">
        Before you go
      </h2>
      <p className="text-sm text-[var(--color-ink-3)]">
        Bring these documents to avoid multiple trips.
      </p>
      <ul className="space-y-2">
        {required.map((doc) => (
          <li key={doc.id} className="flex items-center gap-3 text-sm text-[var(--color-ink-2)]">
            <span className="w-4 h-4 rounded border border-[var(--color-green)] flex-none" />
            {doc.label}
          </li>
        ))}
        {optional.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center gap-3 text-sm text-[var(--color-ink-3)]"
          >
            <span className="w-4 h-4 rounded border border-[var(--color-surface3)] flex-none" />
            {doc.label}{' '}
            <span className="text-[10px] font-mono ml-1">(optional)</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
