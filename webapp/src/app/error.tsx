'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">Error</p>
      <h1 className="mt-2 text-2xl font-bold text-[var(--color-ink)]">Something went wrong</h1>
      <p className="mt-3 text-sm text-[var(--color-ink-3)] max-w-xs leading-relaxed">
        An unexpected error occurred. Please try again — if this keeps happening, contact us.
      </p>
      {error.digest && (
        <p className="mt-2 text-[10px] font-mono text-[var(--color-ink-4)]">
          Reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
