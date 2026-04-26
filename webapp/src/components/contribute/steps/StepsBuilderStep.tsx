'use client';

import { useState } from 'react';
import type { GuideDraft, StepDraft } from '../types';

const input =
  'px-2.5 py-1.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)/20] focus:border-[var(--color-green)] transition-colors';

interface Props {
  draft: GuideDraft;
  updateDraft: (updates: Partial<GuideDraft>) => void;
}

function newStep(): StepDraft {
  return { id: crypto.randomUUID(), title: '', description: '', cost: '', office: '', day: '' };
}

export function StepsBuilderStep({ draft, updateDraft }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const steps = draft.steps;

  function add() {
    const s = newStep();
    updateDraft({ steps: [...steps, s] });
    setExpanded(s.id);
  }

  function patch(id: string, updates: Partial<StepDraft>) {
    updateDraft({ steps: steps.map((s) => (s.id === id ? { ...s, ...updates } : s)) });
  }

  function remove(id: string) {
    updateDraft({ steps: steps.filter((s) => s.id !== id) });
    if (expanded === id) setExpanded(null);
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...steps];
    const swapIdx = index + dir;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    const tmp = next[index]!;
    next[index] = next[swapIdx]!;
    next[swapIdx] = tmp;
    updateDraft({ steps: next });
  }

  return (
    <div className="space-y-3">
      {/* Status bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-surface2)] text-[var(--color-ink-2)] border border-[var(--color-surface3)]">
          {steps.length} step{steps.length !== 1 ? 's' : ''}
        </span>
        {steps.filter((s) => s.cost).length > 0 && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-green-tint)] text-[var(--color-green)] border border-[var(--color-green-soft)]">
            {steps.filter((s) => s.cost).length} with cost
          </span>
        )}
        {steps.filter((s) => s.office).length > 0 && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-blue-soft)] text-[var(--color-blue)] border border-[var(--color-blue-soft)]">
            {steps.filter((s) => s.office).length} with office
          </span>
        )}
      </div>

      {/* Step rows */}
      {steps.map((step, i) => (
        <div
          key={step.id}
          className="border border-[var(--color-surface3)] rounded-lg bg-white overflow-hidden"
        >
          {/* Row header */}
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Number */}
            <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-green)] text-white text-xs font-mono flex items-center justify-center leading-none">
              {i + 1}
            </span>

            {/* Title */}
            <input
              className={`${input} flex-1`}
              value={step.title}
              onChange={(e) => patch(step.id, { title: e.target.value })}
              placeholder={`Step ${i + 1} title`}
              onClick={() => setExpanded(expanded === step.id ? null : step.id)}
            />

            {/* Cost */}
            <input
              className={`${input} w-28`}
              value={step.cost}
              onChange={(e) => patch(step.id, { cost: e.target.value })}
              placeholder="Le cost"
            />

            {/* Office */}
            <input
              className={`${input} w-36 hidden sm:block`}
              value={step.office}
              onChange={(e) => patch(step.id, { office: e.target.value })}
              placeholder="Office"
            />

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="w-6 h-6 flex items-center justify-center rounded text-[var(--color-ink-4)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface2)] transition-colors disabled:opacity-30"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === steps.length - 1}
                className="w-6 h-6 flex items-center justify-center rounded text-[var(--color-ink-4)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface2)] transition-colors disabled:opacity-30"
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setExpanded(expanded === step.id ? null : step.id)}
                className="w-6 h-6 flex items-center justify-center rounded text-[var(--color-ink-4)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface2)] transition-colors text-xs"
                aria-label="Expand"
              >
                {expanded === step.id ? '▲' : '▼'}
              </button>
              <button
                type="button"
                onClick={() => remove(step.id)}
                className="w-6 h-6 flex items-center justify-center rounded text-[var(--color-ink-4)] hover:text-[var(--color-red)] hover:bg-[var(--color-red-soft)] transition-colors"
                aria-label="Delete step"
              >
                ×
              </button>
            </div>
          </div>

          {/* Expanded detail */}
          {expanded === step.id && (
            <div className="px-4 pb-4 pt-0 border-t border-[var(--color-surface3)] bg-[var(--color-surface2)] space-y-3">
              <div className="pt-3">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)/20 focus:border-[var(--color-green)] transition-colors resize-none"
                  rows={3}
                  value={step.description}
                  onChange={(e) => patch(step.id, { description: e.target.value })}
                  placeholder="Explain what happens in this step…"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1">
                    Office (mobile)
                  </label>
                  <input
                    className="w-full px-2.5 py-1.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:border-[var(--color-green)] transition-colors sm:hidden"
                    value={step.office}
                    onChange={(e) => patch(step.id, { office: e.target.value })}
                    placeholder="e.g. CAC · Freetown"
                  />
                  <p className="hidden sm:block text-xs text-[var(--color-ink-4)]">{step.office || '—'}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)] mb-1">
                    Day
                  </label>
                  <input
                    className="w-16 px-2.5 py-1.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
                    type="number"
                    min={1}
                    value={step.day}
                    onChange={(e) => patch(step.id, { day: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add step */}
      <button
        type="button"
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-[var(--color-surface3)] rounded-lg text-sm text-[var(--color-ink-3)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Add step
      </button>

      {steps.length === 0 && (
        <p className="text-xs text-[var(--color-ink-4)] italic text-center pt-1">
          Every guide needs at least one step.
        </p>
      )}
    </div>
  );
}
