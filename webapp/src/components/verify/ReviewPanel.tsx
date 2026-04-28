'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Guide, Step, DocumentNeeded, BudgetLine, CategoryKey } from '@opensteps/types';
import { formatLeone, formatDuration } from '@opensteps/types';
import StepList from '@/components/guide/StepList';
import WhatToBring from '@/components/guide/WhatToBring';
import BudgetBreakdown from '@/components/guide/BudgetBreakdown';
import { editorApprove, editorFlag, updateGuideContent } from '@/app/[country]/verify/actions';

const CATEGORY_LABEL: Record<string, string> = {
  business: 'Business',
  id: 'ID & docs',
  transport: 'Transport',
  health: 'Health',
  education: 'Education',
  tax: 'Tax',
  property: 'Property',
  travel: 'Travel',
};

interface Props {
  guide: Guide;
  steps: Step[];
  documents: DocumentNeeded[];
  budgetLines: BudgetLine[];
  country: string;
}

export function ReviewPanel({ guide, steps, documents, budgetLines, country }: Props): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flagMode, setFlagMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState(guide.title);
  const [editDesc, setEditDesc] = useState(guide.description ?? '');
  const [editCategory, setEditCategory] = useState<CategoryKey>(guide.category);

  function handleApprove() {
    setError(null);
    startTransition(async () => {
      try {
        await editorApprove(guide.id);
        router.push(`/${country}/verify`);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to approve. Please try again.');
      }
    });
  }

  function handleFlag() {
    if (!flagMode) { setFlagMode(true); return; }
    setError(null);
    startTransition(async () => {
      try {
        await editorFlag(guide.id, reason || 'Needs revision');
        router.push(`/${country}/verify`);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to flag. Please try again.');
      }
    });
  }

  function handleSaveEdits() {
    setError(null);
    startTransition(async () => {
      try {
        await updateGuideContent(guide.id, {
          ...(editTitle.trim() ? { title: editTitle.trim() } : {}),
          ...(editDesc.trim() ? { description: editDesc.trim() } : {}),
          ...(editCategory ? { category: editCategory } : {}),
        });
        setEditMode(false);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save edits.');
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white rounded-xl border border-[var(--color-surface3)]">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
        >
          ← Back to queue
        </button>

        <div className="flex-1" />

        {flagMode && (
          <input
            className="flex-1 min-w-0 px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] transition-colors"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Flag reason (e.g. Missing steps)"
            onKeyDown={(e) => e.key === 'Enter' && handleFlag()}
            autoFocus
          />
        )}

        <div className="flex gap-2 shrink-0 flex-wrap">
          {editMode ? (
            <>
              <button
                type="button"
                onClick={() => { setEditMode(false); setEditTitle(guide.title); setEditDesc(guide.description ?? ''); setEditCategory(guide.category); }}
                className="px-3 py-2 text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdits}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-[var(--color-ink)] text-white text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {isPending ? 'Saving…' : 'Save edits'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="px-3 py-2 rounded-lg border border-[var(--color-surface3)] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
            >
              Edit
            </button>
          )}

          {!editMode && (
            <>
              {flagMode && (
                <button
                  type="button"
                  onClick={() => { setFlagMode(false); setReason(''); }}
                  className="px-3 py-2 text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={handleFlag}
                disabled={isPending}
                className="px-4 py-2 rounded-lg border-2 border-[var(--color-red-soft)] bg-[var(--color-red-soft)] text-[var(--color-red)] text-sm font-medium hover:bg-[var(--color-red)] hover:text-white hover:border-[var(--color-red)] transition-colors disabled:opacity-50"
              >
                {flagMode ? 'Confirm flag' : 'Flag'}
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
              >
                {isPending ? 'Saving…' : 'Approve & Publish'}
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-[var(--color-red)]">{error}</p>}

      {/* Two-column review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — submitted data (with optional inline edit) */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            {editMode ? 'Editing' : 'Submitted data'}
          </h2>
          <div className="bg-white rounded-xl border border-[var(--color-surface3)] p-5 space-y-4">
            {editMode ? (
              <>
                <EditField label="Title">
                  <input
                    className={inp}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </EditField>
                <EditField label="Category">
                  <select
                    className={inp}
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as CategoryKey)}
                  >
                    {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </EditField>
                <EditField label="Description">
                  <textarea
                    className={`${inp} resize-none`}
                    rows={4}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </EditField>
              </>
            ) : (
              <>
                <Field label="Title" value={guide.title} />
                <Field label="Category" value={CATEGORY_LABEL[guide.category] ?? guide.category} />
                {guide.description && <Field label="Description" value={guide.description} multiline />}
                {guide.duration_days && (
                  <Field label="Duration" value={formatDuration(guide.duration_days)} />
                )}
                {guide.total_cost > 0 && (
                  <Field label="Total cost" value={formatLeone(guide.total_cost)} />
                )}
                <Field label="Steps" value={`${guide.steps_count} step${guide.steps_count !== 1 ? 's' : ''}`} />
              </>
            )}

            {steps.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--color-surface3)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
                  Step titles
                </span>
                <ol className="space-y-1">
                  {steps.map((s) => (
                    <li key={s.id} className="flex items-start gap-2 text-sm text-[var(--color-ink-2)]">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-green)] text-white text-xs font-mono flex items-center justify-center leading-none mt-0.5">
                        {s.n}
                      </span>
                      {s.title}
                      {s.cost > 0 && (
                        <span className="ml-auto shrink-0 text-xs font-mono text-[var(--color-ink-3)]">
                          {formatLeone(s.cost)}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {documents.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--color-surface3)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
                  Documents required
                </span>
                <ul className="space-y-1">
                  {documents.map((d) => (
                    <li key={d.id} className="flex items-center gap-2 text-sm text-[var(--color-ink-2)]">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${d.required ? 'bg-[var(--color-green)] text-white' : 'bg-[var(--color-surface2)] text-[var(--color-ink-3)]'}`}>
                        {d.required ? 'Req' : 'Opt'}
                      </span>
                      {d.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 border-t border-[var(--color-surface3)]">
              <Field
                label="Submitted"
                value={new Date(guide.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              />
            </div>
          </div>
        </div>

        {/* Right — preview */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Preview (published view)
          </h2>
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[var(--color-surface3)] p-5">
              <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-1">
                {editMode ? editTitle : guide.title}
              </h1>
              {(editMode ? editDesc : guide.description) && (
                <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {editMode ? editDesc : guide.description}
                </p>
              )}
            </div>

            {documents.length > 0 && <WhatToBring documents={documents} />}

            {steps.length > 0 && (
              <div className="bg-white rounded-xl border border-[var(--color-surface3)] p-5">
                <StepList steps={steps} evidence={[]} />
              </div>
            )}

            {budgetLines.length > 0 && (
              <div className="bg-white rounded-xl border border-[var(--color-surface3)] p-5">
                <BudgetBreakdown lines={budgetLines} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inp = 'w-full px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

function Field({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }): JSX.Element {
  return (
    <div className="space-y-0.5">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">{label}</span>
      {multiline ? (
        <p className="text-sm text-[var(--color-ink-2)] leading-relaxed whitespace-pre-wrap">{value}</p>
      ) : (
        <p className="text-sm text-[var(--color-ink-2)]">{value}</p>
      )}
    </div>
  );
}

function EditField({ label, children }: { label: string; children: React.ReactNode }): JSX.Element {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">{label}</span>
      {children}
    </div>
  );
}
