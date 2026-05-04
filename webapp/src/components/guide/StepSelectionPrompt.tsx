'use client';

import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { Step } from '@opensteps/types';

interface Prompt {
  stepId: string;
  stepN: number;
  x: number;
  y: number;
}

export function StepSelectionPrompt({ steps }: { steps: Step[] }): JSX.Element | null {
  const [prompt, setPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    function dismiss() { setPrompt(null); }

    function onMouseUp() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        setPrompt(null);
        return;
      }

      const range = sel.getRangeAt(0);
      const node = range.commonAncestorContainer;
      const el = (node.nodeType === Node.TEXT_NODE ? node.parentElement : node) as Element | null;
      const stepEl = el?.closest?.('[id^="step-"]') as HTMLElement | null;

      if (!stepEl) { setPrompt(null); return; }

      const n = parseInt(stepEl.id.replace('step-', ''), 10);
      const step = steps.find((s) => s.n === n);
      if (!step) { setPrompt(null); return; }

      const rect = range.getBoundingClientRect();
      setPrompt({
        stepId: step.id,
        stepN: n,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('scroll', dismiss, { passive: true });
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('scroll', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, [steps]);

  if (!prompt) return null;

  function handleClick() {
    if (!prompt) return;
    window.dispatchEvent(
      new CustomEvent('opensteps:add-tip', { detail: { stepId: prompt.stepId, stepN: prompt.stepN } }),
    );
    window.getSelection()?.removeAllRanges();
    setPrompt(null);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        position: 'fixed',
        left: prompt.x,
        top: prompt.y,
        transform: 'translateX(-50%) translateY(-100%)',
        zIndex: 50,
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-ink)] text-white text-[11px] font-mono whitespace-nowrap shadow-lg cursor-pointer hover:opacity-90 transition-opacity select-none animate-in fade-in duration-150"
    >
      <span>Share a tip for this step</span>
      <span aria-hidden="true">↓</span>
    </div>
  );
}
