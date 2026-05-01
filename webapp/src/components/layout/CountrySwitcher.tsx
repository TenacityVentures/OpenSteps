'use client';

import type { JSX } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentMeta = COUNTRIES.find((c) => c.code === current) ?? COUNTRIES[0]!;
  const filtered = COUNTRIES.filter(
    (c) =>
      c.active &&
      (c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase())),
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open, close]);

  // Reset active index when query/options change
  useEffect(() => {
    setActiveIndex(-1);
    optionRefs.current = [];
  }, [query]);

  function handleSelect(code: CountryCode) {
    document.cookie = `preferred_country=${code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    close();
    triggerRef.current?.focus();
    router.push(`/${code}`);
    router.refresh();
  }

  function focusOption(index: number) {
    setActiveIndex(index);
    optionRefs.current[index]?.focus();
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { close(); triggerRef.current?.focus(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) focusOption(0);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) focusOption(filtered.length - 1);
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === 'Escape') { close(); triggerRef.current?.focus(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % filtered.length;
      focusOption(next);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        setActiveIndex(-1);
        inputRef.current?.focus();
      } else {
        focusOption(index - 1);
      }
    }
  }

  const listboxId = 'country-listbox';

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`Current country: ${currentMeta.name}. Click to change.`}
        className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink-3)] bg-[var(--color-surface2)] px-2 py-0.5 rounded-full hover:bg-[var(--color-surface3)] transition-colors select-none"
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
              ref={inputRef}
              autoFocus
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={open}
              aria-activedescendant={activeIndex >= 0 ? `country-option-${filtered[activeIndex]?.code}` : undefined}
              className="w-full px-2.5 py-1.5 text-sm bg-[var(--color-surface2)] rounded-lg text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green)]"
              placeholder="Search country…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
          <div id={listboxId} className="py-1 max-h-52 overflow-y-auto" role="listbox" aria-label="Countries">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-xs text-[var(--color-ink-4)]" role="status">No results</p>
            ) : (
              filtered.map((c, i) => (
                <button
                  key={c.code}
                  id={`country-option-${c.code}`}
                  ref={(el) => { optionRefs.current[i] = el; }}
                  type="button"
                  role="option"
                  aria-selected={c.code === current}
                  onClick={() => handleSelect(c.code as CountryCode)}
                  onKeyDown={(e) => handleOptionKeyDown(e, i)}
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
