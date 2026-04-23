import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[--color-surface3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
        {/* Brand */}
        <Link href="/sl" className="flex items-center gap-2 shrink-0">
          <svg viewBox="0 0 40 40" className="w-7 h-7 text-[--color-green]" aria-hidden="true">
            <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.4"
              strokeDasharray="4 2.5" strokeLinecap="round" />
            <path d="M11 21.5 L17 27 L30 13.5" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-[--color-ink]">OpenSteps</span>
          <span className="hidden sm:inline text-xs font-mono text-[--color-ink-3] bg-[--color-surface2] px-2 py-0.5 rounded-full">
            🇸🇱 Sierra Leone
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[--color-ink-2]">
          <Link href="/sl" className="hover:text-[--color-green] transition-colors">Browse</Link>
          <Link href="/sl" className="hover:text-[--color-green] transition-colors">Guides</Link>
          <Link href="/search" className="hover:text-[--color-green] transition-colors">Search</Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="text-sm text-[--color-ink-2] hover:text-[--color-green] px-3 py-1.5 rounded-lg hover:bg-[--color-surface2] transition-colors"
          >
            🔍
          </Link>
          <Link
            href="#contribute"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[--color-green] text-white hover:bg-[--color-green-mid] transition-colors"
          >
            Contribute
          </Link>
        </div>
      </div>
    </header>
  );
}
