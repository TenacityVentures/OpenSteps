import type { Guide } from '@opensteps/types';

export default function TrustStats({ guides }: { guides: Guide[] }) {
  const total = guides.length;
  const avgTrust =
    total > 0 ? (guides.reduce((s, g) => s + g.trust_score, 0) / total).toFixed(1) : '—';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: 'Guides', value: total.toString() },
        { label: 'Avg trust', value: `${avgTrust} / 10` },
        { label: 'Country', value: 'Sierra Leone' },
        { label: 'Language', value: 'English · Krio soon' },
      ].map(({ label, value }) => (
        <div key={label} className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)]">
            {label}
          </div>
          <div className="mt-1 font-serif text-2xl text-[var(--color-ink)]">{value}</div>
        </div>
      ))}
    </div>
  );
}
