import type { JSX } from 'react';
import Link from 'next/link';
import type { CountryMeta } from '@opensteps/constants';

interface Props {
  country: CountryMeta;
}

const NAV_LINKS = [
  { label: 'Browse', href: (c: string) => `/${c}` },
  { label: 'Verify', href: (c: string) => `/${c}/verify` },
  { label: 'Contribute', href: (c: string) => `/${c}/contribute` },
  { label: 'Leaderboard', href: (c: string) => `/${c}/leaderboard` },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'GitHub', href: 'https://github.com/anthropics/opensteps', external: true },
];

export default function AppFooter({ country }: Props): JSX.Element {
  return (
    <footer className="mt-20 border-t border-[var(--color-surface3)] bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-[var(--color-ink)]">OpenSteps</span>
              <span className="text-xs font-mono text-[var(--color-ink-4)] bg-[var(--color-surface2)] px-1.5 py-0.5 rounded">
                beta
              </span>
            </div>
            <p className="text-xs text-[var(--color-ink-3)] leading-relaxed max-w-[220px]">
              Community-verified guides for government processes in {country.name}.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink-4)]">
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Explore</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href(country.code)}
                    className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Legal</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, href, external }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-surface3)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-[var(--color-ink-4)]">
            © {new Date().getFullYear()} OpenSteps · Not affiliated with any government body
          </p>
          <p className="text-[11px] font-mono text-[var(--color-ink-4)]">
            Built with ♥ for {country.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
