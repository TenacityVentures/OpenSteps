import type { JSX } from 'react';
import { CATEGORY_MAP } from '@opensteps/constants';
import { Spinner } from '@/components/ui/Spinner';
import type { GuideDraft } from '../types';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-2.5 border-b border-[var(--color-surface3)] last:border-0">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)] w-32 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-[var(--color-ink)] flex-1">{value || <em className="text-[var(--color-ink-4)]">—</em>}</span>
    </div>
  );
}

export function ReviewStep({ draft, onSubmit, submitting, error }: Props): JSX.Element {
  const categoryLabel =
    draft.category && CATEGORY_MAP[draft.category] ? CATEGORY_MAP[draft.category].label : draft.category || '—';

  const total = draft.budget_lines.reduce((sum, l) => sum + (parseInt(l.amount) || 0), 0);

  const issues: string[] = [];
  if (!draft.title.trim()) issues.push('Title is required');
  if (!draft.category) issues.push('Category is required');
  if (draft.steps.length === 0) issues.push('Add at least one step');

  return (
    <div className="space-y-6">
      {/* Issues */}
      {issues.length > 0 && (
        <div className="bg-[var(--color-amber-soft)] border border-[var(--color-amber)] rounded-lg p-4 space-y-1">
          <p className="text-xs font-semibold text-[var(--color-amber)]">Before you submit</p>
          <ul className="text-xs text-[var(--color-ink-2)] space-y-0.5 list-disc list-inside">
            {issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)] mb-3">Summary</p>
        <div className="bg-[var(--color-surface2)] rounded-lg px-4 border border-[var(--color-surface3)]">
          <Row label="Title" value={draft.title} />
          <Row label="Category" value={categoryLabel} />
          <Row label="Location" value={[draft.city, draft.country].filter(Boolean).join(', ')} />
          <Row label="Est. time" value={draft.estimated_time} />
          <Row label="Est. cost" value={draft.estimated_cost || (total > 0 ? `Le ${total.toLocaleString('en-SL')}` : '')} />
          <Row label="Description" value={draft.description} />
        </div>
      </div>

      {/* Steps */}
      {draft.steps.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)] mb-3">
            {draft.steps.length} Step{draft.steps.length !== 1 ? 's' : ''}
          </p>
          <ol className="space-y-2">
            {draft.steps.map((step, i) => (
              <li key={step.id} className="flex gap-3 items-start">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-green)] text-white text-[10px] font-mono flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-ink)]">{step.title || <em className="text-[var(--color-ink-4)">Untitled step</em>}</p>
                  {step.description && (
                    <p className="text-xs text-[var(--color-ink-3)] mt-0.5 line-clamp-2">{step.description}</p>
                  )}
                  <div className="flex gap-3 mt-1 flex-wrap">
                    {step.cost && (
                      <span className="text-[10px] font-mono text-[var(--color-green)]">Le {parseInt(step.cost).toLocaleString('en-SL')}</span>
                    )}
                    {step.office && (
                      <span className="text-[10px] font-mono text-[var(--color-ink-3)]">{step.office}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Requirements */}
      {draft.documents.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)] mb-3">
            {draft.documents.length} Requirement{draft.documents.length !== 1 ? 's' : ''}
          </p>
          <ul className="space-y-1">
            {draft.documents.map((doc) => (
              <li key={doc.id} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${doc.required
                      ? 'bg-[var(--color-green-soft)] text-[var(--color-green)]'
                      : 'bg-[var(--color-surface2)] text-[var(--color-ink-4)]'
                    }`}
                >
                  {doc.required ? 'req' : 'opt'}
                </span>
                {doc.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editorial note */}
      <div className="bg-[var(--color-blue-soft)] border border-[var(--color-blue-soft)] rounded-lg p-4">
        <p className="text-xs font-semibold text-[var(--color-blue)] mb-1">What happens next?</p>
        <p className="text-xs text-[var(--color-ink-2)]">
          Your guide will be reviewed by an OpenSteps editor before it goes live. They may reach out
          to clarify details or request evidence. The process usually takes 2–5 days.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-[var(--color-red-soft)] border border-[var(--color-red)] rounded-lg p-3 text-sm text-[var(--color-red)]">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting || issues.length > 0}
        className="w-full py-3 rounded-lg bg-[var(--color-green)] text-white font-semibold text-sm hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Spinner size={14} /> Submitting…
          </span>
        ) : 'Submit for review →'}
      </button>
    </div>
  );
}
