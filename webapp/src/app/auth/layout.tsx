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

      {/* Top-right — bright paper catching light */}
      {/*<div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: '0%',
          right: '0%',
          width: '65vw',
          height: '80vh',
          borderRadius: '28% 72% 68% 32% / 35% 28% 72% 65%',
          background: 'linear-gradient(222deg, rgba(255,254,252,1) 0%, rgba(255,253,249,0.72) 22%, rgba(249,246,239,0.28) 52%, transparent 78%)',
          transform: 'rotate(-100deg)',
        }}
      />*/}
      {/* Bottom-left — shadow fold, warm brown */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          bottom: '-30%',
          left: '-5%',
          width: '60vw',
          height: '75vh',
          borderRadius: '68% 32% 32% 68% / 65% 72% 28% 35%',
          background: 'linear-gradient(42deg, rgba(192,174,142,0.90) 0%, rgba(212,196,166,0.55) 25%, rgba(232,220,200,0.20) 55%, transparent 78%)',
          transform: 'rotate(8deg)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: '-30%',
          right: '-10%',
          width: '60vw',
          height: '75vh',
          borderRadius: '68% 32% 32% 68% / 65% 72% 28% 35%',
          background: 'linear-gradient(42deg, rgba(192,174,142,0.90) 0%, rgba(212,196,166,0.55) 25%, rgba(232,220,200,0.20) 55%, transparent 78%)',
          transform: 'rotate(150deg)',
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
