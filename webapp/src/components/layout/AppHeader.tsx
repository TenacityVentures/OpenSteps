'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { UserMenu } from '@/components/layout/UserMenu';
import { CountrySwitcher } from '@/components/layout/CountrySwitcher';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

function extractCountry(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const code = match?.[1];
  return code && (ACTIVE_COUNTRY_CODES as string[]).includes(code) ? code : 'sl';
}

export default function AppHeader(): JSX.Element {
  const pathname = usePathname();
  const country = extractCountry(pathname);

  const navLinks = [
    { label: 'Browse',      href: `/${country}`,             active: pathname === `/${country}` || pathname === `/${country}/` },
    { label: 'Verify',      href: `/${country}/verify`,      active: pathname.startsWith(`/${country}/verify`) },
    { label: 'Leaderboard', href: `/${country}/leaderboard`, active: pathname.startsWith(`/${country}/leaderboard`) },
    // { label: 'Search', href: '/search', active: pathname.startsWith('/search') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[var(--color-surface3)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
        {/* Brand */}
        <Link href={`/${country}`} aria-label="OpenSteps home" className="flex items-center gap-2 shrink-0">
          <Logo variant="wordmark" size={28} />
        </Link>
        <CountrySwitcher current={country} />

        {/* Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm text-[var(--color-ink-2)]">
          {navLinks.map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={[
                'hover:text-[var(--color-green)] transition-colors',
                active ? 'text-[var(--color-green)] font-medium' : '',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden md:flex items-center justify-center w-8 h-8 text-[var(--color-ink-2)] hover:text-[var(--color-green)] rounded-lg hover:bg-[var(--color-surface2)] transition-colors"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <line x1="12.5" y1="12.5" x2="17" y2="17" />
            </svg>
          </Link>
          <Link
            href={`/${country}/contribute`}
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[var(--color-green)] text-white hover:bg-[var(--color-green-mid)] transition-colors"
          >
            Contribute
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
