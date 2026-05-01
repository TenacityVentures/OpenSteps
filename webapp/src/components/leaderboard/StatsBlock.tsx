import type { JSX } from 'react';

interface Stat {
  label: string;
  value: number;
}

interface Props {
  stats: Stat[];
  layout: 'cards' | 'graph';
}

export function StatsBlock({ stats, layout }: Props): JSX.Element {
  if (layout === 'cards') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[var(--color-surface3)] p-4 text-center space-y-1 transition-colors duration-300"
          >
            <p className="text-2xl font-bold text-[var(--color-ink)] tabular-nums">{s.value}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">{s.label}</p>
          </div>
        ))}
      </div>
    );
  }

  // graph mode — transparent so the parent's graph-paper bg shows through
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-[var(--color-surface3)]">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center justify-center py-10 px-4 gap-2">
          <span className="text-4xl sm:text-5xl font-bold text-[var(--color-ink)] tabular-nums leading-none">
            {s.value}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
