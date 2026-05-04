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

      {/* Top-right — layered green + amber light */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: '-20%',
          right: '-15%',
          width: '62vw',
          height: '82vh',
          borderRadius: '30% 70% 60% 40% / 40% 30% 70% 60%',
          background: [
            'radial-gradient(ellipse 80% 60% at 65% 30%, rgba(222,236,223,0.72) 0%, rgba(234,243,236,0.28) 40%, transparent 68%)',
            'radial-gradient(ellipse 55% 75% at 30% 70%, rgba(251,236,208,0.45) 0%, rgba(247,243,235,0.15) 38%, transparent 62%)',
          ].join(', '),
          transform: 'rotate(12deg)',
        }}
      />
      {/* Bottom-left — amber + green complement */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          bottom: '-22%',
          left: '-14%',
          width: '58vw',
          height: '78vh',
          borderRadius: '60% 40% 40% 60% / 55% 65% 35% 45%',
          background: [
            'radial-gradient(ellipse 75% 55% at 32% 68%, rgba(251,236,208,0.60) 0%, rgba(247,243,235,0.22) 38%, transparent 65%)',
            'radial-gradient(ellipse 50% 65% at 68% 32%, rgba(222,236,223,0.38) 0%, rgba(234,243,236,0.14) 38%, transparent 60%)',
          ].join(', '),
          transform: 'rotate(12deg)',
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
