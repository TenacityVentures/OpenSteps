import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = { title: 'Guide submitted — OpenSteps' };

export default function SubmittedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-6 text-[var(--color-green)]">
        <Logo variant="icon" size={64} />
      </div>

      <h1 className="font-serif text-3xl text-[var(--color-ink)] mb-3">
        Guide submitted — thank you!
      </h1>

      <p className="text-sm text-[var(--color-ink-3)] max-w-md mb-2">
        An OpenSteps editor will review your guide within 2–5 days. They may reach out
        to clarify details or request evidence before it goes live.
      </p>

      <p className="text-xs font-mono text-[var(--color-ink-4)] mb-8">
        Your draft has been cleared. Submitted guides enter the editorial queue.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/sl/contribute"
          className="text-sm px-4 py-2 rounded-lg border border-[var(--color-surface3)] text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
        >
          Submit another guide
        </Link>
        <Link
          href="/sl"
          className="text-sm font-semibold px-4 py-2 rounded-lg bg-[var(--color-green)] text-white hover:bg-[var(--color-green-mid)] transition-colors"
        >
          Browse guides →
        </Link>
      </div>
    </div>
  );
}
