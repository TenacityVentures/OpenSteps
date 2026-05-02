'use client';

import type { JSX } from 'react';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toaster';
import type { GuideDraft } from './types';
import { EMPTY_DRAFT, WIZARD_STEPS } from './types';
import { BasicsStep } from './steps/BasicsStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { StepsBuilderStep } from './steps/StepsBuilderStep';
import { FeesStep } from './steps/FeesStep';
import { OfficesStep } from './steps/OfficesStep';
import { EvidenceStep } from './steps/EvidenceStep';
import { ReviewStep } from './steps/ReviewStep';
import { submitGuide } from '@/app/[country]/contribute/actions';

const DRAFT_KEY = 'opensteps_guide_draft';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function loadDraft(): GuideDraft {
  if (typeof window === 'undefined') return EMPTY_DRAFT;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return { ...EMPTY_DRAFT, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return EMPTY_DRAFT;
}

function saveDraft(draft: GuideDraft) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* ignore */ }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
}

export function ContributeWizard(): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<GuideDraft>(EMPTY_DRAFT);
  const [submitting, setSubmitting] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
    setMounted(true);
  }, []);

  const updateDraft = useCallback((updates: Partial<GuideDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...updates };
      saveDraft(next);
      setSavedAt(new Date());
      return next;
    });
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await submitGuide(draft);
      clearDraft();
      toast('Guide submitted for review', 'success');
      router.push(`/${draft.country}/contribute/submitted`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const stepProps = { draft, updateDraft };
  const safeStep = Math.min(step, WIZARD_STEPS.length - 1);
  const current = WIZARD_STEPS[safeStep]!;
  const slugPreview = draft.title ? toSlug(draft.title) : 'new-guide';
  const progress = ((safeStep + 1) / WIZARD_STEPS.length) * 100;

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-sm text-[var(--color-ink-4)]">Loading draft…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* URL bar strip — desktop only */}
      <div className="hidden sm:block bg-white border-b border-[var(--color-surface3)]">
        <div className="max-w-[1000px] mx-auto px-6 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-xs font-mono min-w-0">
            <span className="text-[var(--color-ink-4)] shrink-0">opensteps.org/sl/</span>
            <span className="text-[var(--color-ink-2)] truncate">{slugPreview}</span>
          </div>
          {savedAt && (
            <span className="text-[10px] font-mono text-[var(--color-ink-4)] shrink-0">
              Draft saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {' · offline-safe'}
            </span>
          )}
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sm:hidden bg-white border-b border-[var(--color-surface3)] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">
            {current.label} · {safeStep + 1}/{WIZARD_STEPS.length}
          </span>
          {savedAt && (
            <span className="text-[10px] font-mono text-[var(--color-ink-4)]">Saved</span>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-[var(--color-surface3)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-green)] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-3">
          {WIZARD_STEPS.map((s, i) => {
            const done = i < step;
            const active = i === safeStep;
            return (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                aria-label={s.label}
                className={[
                  'w-7 h-7 rounded-full text-[10px] font-mono transition-colors border flex items-center justify-center',
                  active ? 'bg-[var(--color-green)] text-white border-[var(--color-green)]' : '',
                  done && !active ? 'bg-[var(--color-green-tint)] text-[var(--color-green)] border-[var(--color-green-soft)]' : '',
                  !active && !done ? 'bg-[var(--color-surface2)] text-[var(--color-ink-4)] border-[var(--color-surface3)]' : '',
                ].join(' ')}
              >
                {done ? '✓' : i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 sm:py-10 md:flex md:gap-10 md:items-start">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:block shrink-0 w-44 sticky top-28">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)] mb-3">
            Progress
          </p>
          <ol className="flex flex-col gap-0.5">
            {WIZARD_STEPS.map((s, i) => {
              const done = i < step;
              const active = i === safeStep;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setStep(i)}
                    className={[
                      'flex items-center gap-2.5 w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors',
                      active ? 'font-semibold text-[var(--color-ink)] bg-[var(--color-surface2)]' : '',
                      done && !active ? 'text-[var(--color-green)] hover:bg-[var(--color-green-tint)]' : '',
                      !active && !done ? 'text-[var(--color-ink-3)] hover:bg-[var(--color-surface2)]' : '',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono shrink-0 border transition-colors',
                        active ? 'bg-[var(--color-green)] text-white border-[var(--color-green)]' : '',
                        done && !active ? 'border-[var(--color-green)] text-[var(--color-green)]' : '',
                        !active && !done ? 'border-[var(--color-surface3)] text-[var(--color-ink-4)]' : '',
                      ].join(' ')}
                    >
                      {done ? '✓' : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Heading */}
          <div className="mb-5 sm:mb-7">
            <h1 className="font-serif text-2xl sm:text-[2rem] leading-tight text-[var(--color-ink)] mb-1.5">
              {draft.title || 'Start a new guide'}
            </h1>
            <p className="text-sm text-[var(--color-ink-3)]">{current.subtitle}</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl border border-[var(--color-surface3)] shadow-sm p-4 sm:p-7">
            {current.id === 'basics' && <BasicsStep {...stepProps} />}
            {current.id === 'requirements' && <RequirementsStep {...stepProps} />}
            {current.id === 'steps' && <StepsBuilderStep {...stepProps} />}
            {current.id === 'fees' && <FeesStep {...stepProps} />}
            {current.id === 'offices' && <OfficesStep {...stepProps} />}
            {current.id === 'evidence' && <EvidenceStep {...stepProps} />}
            {current.id === 'review' && (
              <ReviewStep
                {...stepProps}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
              />
            )}
          </div>

          {/* Nav */}
          {current.id !== 'review' && (
            <div className="mt-4 sm:mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                onClick={() => { saveDraft(draft); setSavedAt(new Date()); }}
                className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] px-4 py-2 rounded-lg hover:bg-[var(--color-surface2)] transition-colors text-center sm:text-left"
              >
                Save draft
              </button>
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 sm:flex-none text-sm text-[var(--color-ink-2)] px-4 py-2.5 sm:py-2 rounded-lg border border-[var(--color-surface3)] hover:bg-[var(--color-surface2)] transition-colors text-center"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 sm:flex-none text-sm font-semibold px-5 py-2.5 sm:py-2 rounded-lg bg-[var(--color-green)] text-white hover:bg-[var(--color-green-mid)] transition-colors text-center"
                >
                  Next: {WIZARD_STEPS[step + 1]?.label} →
                </button>
              </div>
            </div>
          )}

          {/* Back on review */}
          {current.id === 'review' && (
            <div className="mt-4">
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] px-4 py-2 rounded-lg hover:bg-[var(--color-surface2)] transition-colors"
              >
                ← Back to Evidence
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
