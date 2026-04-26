'use client';

import type { PaymentType } from '@opensteps/types';
import type { GuideDraft, BudgetLineDraft } from '../types';

const input =
  'px-2.5 py-1.5 bg-white border border-[var(--color-surface3)] rounded-[  var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)/20] focus:border-[var(--color-green)] transition-colors';

const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: 'bank', label: 'Bank' },
  { value: 'cash', label: 'Cash' },
  { value: 'mobile_money', label: 'Mobile money' },
  { value: 'unofficial', label: 'Unofficial' },
];

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

function newLine(): BudgetLineDraft {
  return { id: crypto.randomUUID(), label: '', amount: '', office: '', payment_type: 'cash' };
}

export function FeesStep({ draft, updateDraft }: Props) {
  const lines = draft.budget_lines;

  function add() {
    updateDraft({ budget_lines: [...lines, newLine()] });
  }

  function patch(id: string, updates: Partial<BudgetLineDraft>) {
    updateDraft({ budget_lines: lines.map((l) => (l.id === id ? { ...l, ...updates } : l)) });
  }

  function remove(id: string) {
    updateDraft({ budget_lines: lines.filter((l) => l.id !== id) });
  }

  const total = lines.reduce((sum, l) => sum + (parseInt(l.amount) || 0), 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-[--color-ink-3]">
        List every cost someone will encounter — bank fees, form costs, processing fees, and unofficial payments.
      </p>

      {/* Header row */}
      {lines.length > 0 && (
        <div className="grid grid-cols-[1fr_100px_140px_120px_24px] gap-2 px-1">
          {['Description', 'Amount (Le)', 'Office', 'Payment type', ''].map((h) => (
            <span key={h} className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Lines */}
      {lines.map((line) => (
        <div key={line.id} className="grid grid-cols-[1fr_100px_140px_120px_24px] gap-2 items-center">
          <input
            className={`${input} w-full`}
            value={line.label}
            onChange={(e) => patch(line.id, { label: e.target.value })}
            placeholder="e.g. Business name reservation"
          />
          <input
            className={`${input} w-full`}
            value={line.amount}
            onChange={(e) => patch(line.id, { amount: e.target.value })}
            placeholder="10000"
            type="number"
            min={0}
          />
          <input
            className={`${input} w-full`}
            value={line.office}
            onChange={(e) => patch(line.id, { office: e.target.value })}
            placeholder="CAC · online"
          />
          <select
            className={`${input} w-full`}
            value={line.payment_type}
            onChange={(e) => patch(line.id, { payment_type: e.target.value as PaymentType })}
          >
            {PAYMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => remove(line.id)}
            className="w-6 h-6 flex items-center justify-center rounded text-[var(--color-ink-4)] hover:text-[var(--color-red)] hover:bg-[var(--color-red-soft)] transition-colors"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}

      {/* Add */}
      <button
        type="button"
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-[var(--color-surface3)] rounded-lg text-sm text-[var(--color-ink-3)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Add fee
      </button>

      {/* Total */}
      {total > 0 && (
        <div className="flex justify-end pt-2 border-t border-[var(--color-surface3)]">
          <span className="text-sm font-semibold text-[var(--color-ink)]">
            Total: Le {total.toLocaleString('en-SL')}
          </span>
        </div>
      )}

      {lines.length === 0 && (
        <p className="text-xs text-[var(--color-ink-4)] italic">
          No fees yet — add even unofficial payments so users know what to expect.
        </p>
      )}
    </div>
  );
}
