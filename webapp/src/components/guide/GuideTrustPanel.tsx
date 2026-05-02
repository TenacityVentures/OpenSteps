import type { JSX } from 'react';
import type { Guide, Verifier, BudgetLine, DocumentNeeded } from '@opensteps/types';
import { formatLeone, formatDate } from '@/lib/format';
import TrustBar from '@/components/ui/TrustBar';
import VerifierList from './VerifierList';

export default function GuideTrustPanel({
  guide,
  verifiers,
  budget,
  documents,
}: {
  guide: Guide;
  verifiers: Verifier[];
  budget: BudgetLine[];
  documents: DocumentNeeded[];
}): JSX.Element {
  return (
    <div className="space-y-5">
      {/* Trust score */}
      <div className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-2">
          Trust score
        </div>
        <div className="font-serif text-4xl text-[var(--color-green)]">
          {guide.trust_score.toFixed(1)}
        </div>
        <div className="text-xs text-[var(--color-ink-3)] mb-3">/ 10</div>
        <TrustBar score={guide.trust_score} />
        {guide.last_verified_at && (
          <div className="text-xs font-mono text-[var(--color-ink-3)] mt-2">
            Last verified {formatDate(guide.last_verified_at)}
          </div>
        )}
      </div>

      {/* What to bring (compact) */}
      {documents.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-2">
            What to bring
          </div>
          <ul className="space-y-1.5">
            {documents.slice(0, 5).map((d) => (
              <li key={d.id} className="flex items-center gap-2 text-xs text-[var(--color-ink-2)]">
                <span className="w-3.5 h-3.5 rounded border border-[var(--color-surface3)] flex-none" />
                {d.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Budget summary */}
      {budget.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-3">
            Total cost
          </div>
          <div className="font-serif text-2xl text-[var(--color-ink)]">
            {formatLeone(guide.total_cost)}
          </div>
          <div className="mt-2 space-y-1">
            {budget.slice(0, 4).map((line) => (
              <div key={line.id} className="flex justify-between text-xs text-[var(--color-ink-3)]">
                <span className="truncate">{line.label}</span>
                <span className="font-mono ml-2 shrink-0">{formatLeone(line.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verifiers */}
      {verifiers.length > 0 && (
        <div className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
          <VerifierList verifiers={verifiers} />
        </div>
      )}
    </div>
  );
}
