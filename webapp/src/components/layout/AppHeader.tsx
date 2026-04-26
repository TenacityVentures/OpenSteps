import type { JSX } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function AppHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[var(--color-surface3)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
        {/* Brand */}
        <Link href="/sl" className="flex items-center gap-2 shrink-0">
          <Logo variant="wordmark" size={28} />
          <span className="hidden sm:inline text-xs font-mono text-[var(--color-ink-3)] bg-[var(--color-surface2)] px-2 py-0.5 rounded-full">
            🇸🇱 Sierra Leone
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--color-ink-2)]">
          <Link href="/sl" className="hover:text-[var(--color-green)] transition-colors">Browse</Link>
          <Link href="/sl" className="hover:text-[var(--color-green)] transition-colors">Guides</Link>
          <Link href="/search" className="hover:text-[var(--color-green)] transition-colors">Search</Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2 text-[var(--color-ink-2)]">
          <Link
            href="/search"
            className="text-sm text-[var(--color-ink-2)] hover:text-[var(--color-green)] px-3 py-1.5 rounded-lg hover:bg-[var(--color-surface2)] transition-colors"
          >
            🔍
          </Link>
          <Link
            href="/sl/contribute"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[var(--color-green)] text-white hover:bg-[var(--color-green-mid)] transition-colors"
          >
            Contribute
          </Link>
        </div>
      </div>
    </header>
  );
}
