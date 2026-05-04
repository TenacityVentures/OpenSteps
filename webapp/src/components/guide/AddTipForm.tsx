'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import { useUser } from '@/hooks/useUser';
import { addTip } from '@/app/[country]/guide/[slug]/actions';
import type { Tip, Step } from '@opensteps/types';

interface Props {
  guideId: string;
  country: string;
  steps: Step[];
  onAdded: (tip: Tip) => void;
}

export function AddTipForm({ guideId, country, steps, onAdded }: Props): JSX.Element {
  const { user, loading } = useUser();
  const router = useRouter();
  const [text, setText] = useState('');
  const [stepId, setStepId] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const showPicker = isFocused && stepId === null && steps.length > 0;
  const selectedStep = steps.find((s) => s.id === stepId) ?? null;

  if (!loading && !user) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/auth/signin?next=/${country}/guide/${guideId}`)}
        className="w-full py-2.5 text-sm text-[var(--color-ink-3)] border border-dashed border-[var(--color-surface3)] rounded-xl hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
      >
        Sign in to add a tip
      </button>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        const tip = await addTip(guideId, text, stepId ?? undefined);
        onAdded(tip);
        setText('');
        setStepId(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add tip');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      {/* Step picker — slides in above textarea on focus */}
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={[
          'overflow-hidden transition-all duration-200 ease-out',
          showPicker ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="bg-white border border-[var(--color-surface3)] rounded-xl shadow-sm overflow-hidden mb-1">
          <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-ink-4)] px-3 pt-2.5 pb-1.5">
            Reference a step · optional
          </p>
          <div className="max-h-36 overflow-y-auto pb-1.5">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setStepId(step.id)}
                className="group w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-[var(--color-green-tint)]"
              >
                <span className="text-[9px] font-mono font-bold text-[var(--color-ink-4)] group-hover:text-[var(--color-green)] w-4 shrink-0 tabular-nums">
                  {step.n}
                </span>
                <span className="text-xs text-[var(--color-ink-2)] group-hover:text-[var(--color-green)] truncate">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected step chip */}
      {selectedStep && (
        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-lg bg-[var(--color-green-tint)] border border-[var(--color-green-soft)]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-green)]">
            Step {selectedStep.n}: {selectedStep.title}
          </span>
          <button
            type="button"
            onClick={() => setStepId(null)}
            aria-label="Remove step reference"
            className="text-[var(--color-green)] opacity-60 hover:opacity-100 transition-opacity ml-0.5"
          >
            <svg viewBox="0 0 10 10" width={9} height={9} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        </div>
      )}

      <textarea
        className="w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors resize-none"
        rows={2}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (!e.target.value.trim()) setStepId(null);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Share a tip from your experience…"
        disabled={isPending || loading}
      />

      {error && <p className="text-xs text-[var(--color-red)]">{error}</p>}

      {text.trim() && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-1.5 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <Spinner size={12} /> Adding…
              </span>
            ) : 'Add tip'}
          </button>
        </div>
      )}
    </form>
  );
}
