import type { JSX } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <header className="h-14 flex items-center px-6 border-b border-[var(--color-surface3)] bg-white">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="wordmark" size={26} />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
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
