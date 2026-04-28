'use client';

import type { JSX } from 'react';

import { useState } from 'react';

export function SubmittedBanner(): JSX.Element | null {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="mb-6 bg-[var(--color-green-tint)] border border-[var(--color-green-soft)] rounded-lg px-5 py-4 flex items-start gap-4">
      <span className="text-xl mt-0.5">🎉</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[var(--color-green)]">Guide submitted — thank you!</p>
        <p className="text-xs text-[var(--color-ink-2)] mt-0.5">
          An OpenSteps editor will review it within 2–5 days. We may reach out to clarify details or request evidence.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="shrink-0 text-[var(--color-ink-4)] hover:text-[var(--color-ink)] text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
