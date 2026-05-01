import type { JSX } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function NotFound(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Logo variant="mark" size={48} className="opacity-40" />
      <p className="mt-8 text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">404</p>
      <h1 className="mt-2 text-3xl font-bold text-[var(--color-ink)]">Page not found</h1>
      <p className="mt-3 text-sm text-[var(--color-ink-3)] max-w-xs leading-relaxed">
        We could not find what you were looking for. It may have been moved or removed.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="px-4 py-2 rounded-lg border border-[var(--color-surface3)] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
        >
          Search guides
        </Link>
      </div>
    </div>
  );
}
