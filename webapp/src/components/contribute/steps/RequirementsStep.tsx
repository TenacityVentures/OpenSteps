'use client';

import { useState } from 'react';
import type { GuideDraft, DocumentDraft } from '../types';

const label = 'block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1.5';
const input =
  'w-full px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

function newDoc(): DocumentDraft {
  return { id: crypto.randomUUID(), label: '', required: true };
}

export function RequirementsStep({ draft, updateDraft }: Props) {
  const [newLabel, setNewLabel] = useState('');

  const docs = draft.documents;

  function add() {
    const trimmed = newLabel.trim();
    if (!trimmed) return;
    updateDraft({ documents: [...docs, { id: crypto.randomUUID(), label: trimmed, required: true }] });
    setNewLabel('');
  }

  function update(id: string, patch: Partial<DocumentDraft>) {
    updateDraft({ documents: docs.map((d) => (d.id === id ? { ...d, ...patch } : d)) });
  }

  function remove(id: string) {
    updateDraft({ documents: docs.filter((d) => d.id !== id) });
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--color-ink-3)]">
        List the documents, receipts, or items a person must bring. Mark each as required or optional.
      </p>

      {/* Existing docs */}
      {docs.length > 0 && (
        <ul className="space-y-2">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-3 px-3 py-2 bg-[var(--color-surface2)] rounded-[var(--radius)] border border-[var(--color-surface3)]"
            >
              {/* Required toggle */}
              <button
                type="button"
                onClick={() => update(doc.id, { required: !doc.required })}
                className={[
                  'shrink-0 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border transition-colors',
                  doc.required
                    ? 'bg-[var(--color-green)] text-white border-[var(--color-green)]'
                    : 'bg-white text-[var(--color-ink-3)] border-[var(--color-surface3)]',
                ].join(' ')}
                title="Toggle required / optional"
              >
                {doc.required ? 'Required' : 'Optional'}
              </button>

              {/* Label */}
              <input
                className="flex-1 bg-transparent text-sm text-[var(--color-ink)] focus:outline-none"
                value={doc.label}
                onChange={(e) => update(doc.id, { label: e.target.value })}
                placeholder="e.g. National ID card"
              />

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(doc.id)}
                className="shrink-0 text-[var(--color-ink-4)] hover:text-[var(--color-red)] transition-colors text-lg leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add new */}
      <div>
        <label className={label}>Add document</label>
        <div className="flex gap-2">
          <input
            className={input}
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. NIN card, passport, Form A"
            onKeyDown={(e) => e.key === 'Enter' && add()}
          />
          <button
            type="button"
            onClick={add}
            className="shrink-0 px-4 py-2 rounded-[--radius] bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {docs.length === 0 && (
        <p className="text-xs text-[var(--color-ink-4)] italic">
          No requirements added yet — a guide can have zero required documents.
        </p>
      )}
    </div>
  );
}
