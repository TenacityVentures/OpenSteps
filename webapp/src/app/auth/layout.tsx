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

      {/* Top-right blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-48 -right-48 w-[640px] h-[640px]"
        style={{
          borderRadius: '42% 58% 55% 45% / 40% 45% 55% 60%',
          background: 'radial-gradient(ellipse at 55% 45%, rgba(179, 162, 128, 0.28) 0%, transparent 68%)',
        }}
      />
      {/* Bottom-left blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-48 -left-48 w-[580px] h-[580px]"
        style={{
          borderRadius: '58% 42% 45% 55% / 55% 60% 40% 45%',
          background: 'radial-gradient(ellipse at 45% 55%, rgba(179, 162, 128, 0.22) 0%, transparent 68%)',
        }}
      />

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
