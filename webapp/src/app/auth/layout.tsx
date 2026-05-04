import type { JSX } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col overflow-hidden">
      <header className="h-14 flex items-center px-6 border-b border-[var(--color-surface3)] bg-white relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="wordmark" size={26} />
        </Link>
      </header>

      {/* Decorative background arc */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[-120px] right-[-120px]"
        style={{ opacity: 0.045 }}
      >
        <svg viewBox="0 0 48 48" width={560} height={560} fill="none">
          <path
            d="M 6.68 34 A 20 20 0 1 1 41.32 34"
            stroke="#225e44"
            strokeWidth="3"
            strokeDasharray="5.5 3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 12 25 L 20 33 L 36 15"
            stroke="#225e44"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-sm space-y-6">
          {children}
          <p className="text-center text-[11px] font-mono text-[var(--color-ink-4)]">
            A{' '}
            <a
              href="https://10na.city"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-green)] transition-colors"
            >
              10na.city
            </a>
            {' '}product
          </p>
        </div>
      </main>
    </div>
  );
}
