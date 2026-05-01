'use client';

import type { JSX } from 'react';
import { useState } from 'react';

interface Stat {
  label: string;
  value: number;
}

interface Props {
  stats: Stat[];
}

function CardsIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {/* vertical lines */}
      <line x1="4"  y1="1" x2="4"  y2="15" />
      <line x1="8"  y1="1" x2="8"  y2="15" />
      <line x1="12" y1="1" x2="12" y2="15" />
      {/* horizontal lines */}
      <line x1="1" y1="4"  x2="15" y2="4"  />
      <line x1="1" y1="8"  x2="15" y2="8"  />
      <line x1="1" y1="12" x2="15" y2="12" />
    </svg>
  );
}

export function StatsBlock({ stats }: Props): JSX.Element {
  const [layout, setLayout] = useState<'cards' | 'graph'>('cards');

  return (
    <div className="space-y-2">
      {/* Toggle button — top right */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setLayout((l) => (l === 'cards' ? 'graph' : 'cards'))}
          title={layout === 'cards' ? 'Switch to graph view' : 'Switch to card view'}
          className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-ink-4)] hover:text-[var(--color-ink-2)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--color-surface2)]"
        >
          {layout === 'cards' ? <GridIcon /> : <CardsIcon />}
          <span>{layout === 'cards' ? 'Graph' : 'Cards'}</span>
        </button>
      </div>

      {layout === 'cards' ? (
        /* ── Card layout ──────────────────────────────────────────────── */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-[var(--color-surface3)] p-4 text-center space-y-1"
            >
              <p className="text-2xl font-bold text-[var(--color-ink)] tabular-nums">{s.value}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">{s.label}</p>
            </div>
          ))}
        </div>
      ) : (
        /* ── Graph-paper layout ───────────────────────────────────────── */
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--color-bg)',
            backgroundImage: [
              'linear-gradient(var(--color-surface3) 1px, transparent 1px)',
              'linear-gradient(90deg, var(--color-surface3) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '22px 22px',
          }}
        >
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
        </div>
      )}
    </div>
  );
}
