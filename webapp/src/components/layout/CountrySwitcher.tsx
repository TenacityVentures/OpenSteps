'use client';

import type { JSX } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COUNTRIES } from '@opensteps/constants';
import type { CountryCode } from '@opensteps/types';

interface Props {
  current: string;
}

export function CountrySwitcher({ current }: Props): JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const currentMeta = COUNTRIES.find((c) => c.code === current) ?? COUNTRIES[0]!;
  const filtered = COUNTRIES.filter(
    (c) =>
      c.active &&
      (c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase())),
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function handleSelect(code: CountryCode) {
    document.cookie = `preferred_country=${code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setOpen(false);
    setQuery('');
    router.push(`/${code}`);
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink-3)] bg-[var(--color-surface2)] px-2 py-0.5 rounded-full hover:bg-[var(--color-surface3)] transition-colors select-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">{currentMeta.flag}</span>
        <span className="hidden sm:inline">{currentMeta.name}</span>
        <svg
          viewBox="0 0 16 16"
          className={`w-3 h-3 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-xl shadow-lg border border-[var(--color-surface3)] z-50 overflow-hidden">
          <div className="p-2 border-b border-[var(--color-surface3)]">
            <input
              autoFocus
              type="text"
              className="w-full px-2.5 py-1.5 text-sm bg-[var(--color-surface2)] rounded-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green)]"
              placeholder="Search country…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="py-1 max-h-52 overflow-y-auto" role="listbox">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-xs text-[var(--color-ink-4)]">No results</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={c.code === current}
                  onClick={() => handleSelect(c.code as CountryCode)}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-[var(--color-surface2)] transition-colors',
                    c.code === current
                      ? 'text-[var(--color-green)] font-medium'
                      : 'text-[var(--color-ink-2)]',
                  ].join(' ')}
                >
                  <span className="text-base" aria-hidden="true">{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  {c.code === current && (
                    <svg
                      viewBox="0 0 16 16"
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 8l4 4 8-8" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
