import type { JSX } from 'react';
export default function TrustBar({ score, max = 10 }: { score: number; max?: number }): JSX.Element {
  const pct = Math.min(100, (score / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[var(--color-surface3)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-green)] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
