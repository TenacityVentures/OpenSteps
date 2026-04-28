import type { JSX } from 'react';
import type { Verifier } from '@opensteps/types';

export default function VerifierList({ verifiers }: { verifiers: Verifier[] }): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)]">
        Verified by
      </div>
      {verifiers.map((v) => (
        <div key={v.id} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[var(--color-green-soft)] text-[var(--color-green)] flex items-center justify-center text-xs font-bold">
            {v.display_name[0]}
          </div>
          <div className="grow min-w-0">
            <div className="text-sm font-medium text-[var(--color-ink)] truncate">{v.display_name}</div>
            <div className="text-[10px] font-mono text-[var(--color-ink-3)]">
              {v.verification_count} verified
            </div>
          </div>
          {v.role === 'editor' ? (
            <span className="text-[9px] font-mono tracking-widest border border-[var(--color-ink-3)] px-1.5 py-0.5 rounded uppercase text-[var(--color-ink-3)]">
              Editor
            </span>
          ) : (
            <span className="text-xs font-mono text-[var(--color-green)] font-semibold">
              {v.accuracy_pct}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
