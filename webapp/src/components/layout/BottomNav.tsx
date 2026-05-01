'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

function extractCountry(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2,3})(\/|$)/);
  return match?.[1] ?? 'sl';
}

interface NavItem {
  key: string;
  label: string;
  href: (country: string) => string;
  icon: JSX.Element;
  match: (pathname: string, country: string) => boolean;
  primary?: boolean;
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const VerifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <path d="M12 3l1.5 3.5L17 7l-2.5 2.5.5 3.5L12 11.5 9 13l.5-3.5L7 7l3.5-.5z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    label: 'Browse',
    href: (c) => `/${c}`,
    icon: <HomeIcon />,
    match: (p, c) => p === `/${c}` || p === `/${c}/`,
  },
  {
    key: 'search',
    label: 'Search',
    href: () => '/search',
    icon: <SearchIcon />,
    match: (p) => p.startsWith('/search'),
  },
  {
    key: 'contribute',
    label: 'Contribute',
    href: (c) => `/${c}/contribute`,
    icon: <PlusIcon />,
    match: (p, c) => p.startsWith(`/${c}/contribute`),
    primary: true,
  },
  {
    key: 'verify',
    label: 'Verify',
    href: (c) => `/${c}/verify`,
    icon: <VerifyIcon />,
    match: (p, c) => p.startsWith(`/${c}/verify`),
  },
  {
    key: 'account',
    label: 'Account',
    href: () => '/dashboard',
    icon: <PersonIcon />,
    match: (p) => p.startsWith('/dashboard') || p.startsWith('/auth'),
  },
];

export function BottomNav(): JSX.Element {
  const pathname = usePathname();
  const { user } = useUser();
  const country = extractCountry(pathname);

  // Don't render on auth pages or admin
  if (pathname.startsWith('/auth') || pathname.startsWith('/admin')) return <></>;

  return (
    <nav
      aria-label="Mobile navigation"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[var(--color-surface3)] safe-area-pb"
    >
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname, country);
          const href = item.href(country);

          if (item.primary) {
            return (
              <Link
                key={item.key}
                href={href}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 group"
              >
                <div className={[
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150',
                  active
                    ? 'bg-[var(--color-green)] text-white scale-105'
                    : 'bg-[var(--color-green)] text-white group-active:scale-95',
                ].join(' ')}>
                  {item.icon}
                </div>
              </Link>
            );
          }

          // Account item — show user initial when logged in
          if (item.key === 'account' && user) {
            const initial = (user.user_metadata?.['display_name'] as string | undefined)?.[0]?.toUpperCase()
              ?? user.email?.[0]?.toUpperCase()
              ?? '?';
            return (
              <Link
                key={item.key}
                href={href}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className="flex-1 flex flex-col items-center justify-center gap-1 group"
              >
                <div className={[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150',
                  active
                    ? 'bg-[var(--color-green)] text-white ring-2 ring-[var(--color-green)] ring-offset-1'
                    : 'bg-[var(--color-green)] text-white opacity-60 group-active:opacity-100',
                ].join(' ')} aria-hidden="true">
                  {initial}
                </div>
                <span className={[
                  'text-[9px] font-mono tracking-wide transition-colors',
                  active ? 'text-[var(--color-green)]' : 'text-[var(--color-ink-4)]',
                ].join(' ')} aria-hidden="true">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.key}
              href={href}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 group"
            >
              <span className={[
                'transition-all duration-150 group-active:scale-90',
                active ? 'text-[var(--color-green)]' : 'text-[var(--color-ink-4)] group-hover:text-[var(--color-ink-3)]',
              ].join(' ')} aria-hidden="true">
                {item.icon}
              </span>
              <span className={[
                'text-[9px] font-mono tracking-wide transition-colors',
                active ? 'text-[var(--color-green)]' : 'text-[var(--color-ink-4)]',
              ].join(' ')} aria-hidden="true">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
