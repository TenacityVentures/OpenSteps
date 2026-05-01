'use client';

import type { JSX } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchInput(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local state in sync if browser back/forward changes the URL
  useEffect(() => {
    setQ(searchParams.get('q') ?? '');
  }, [searchParams]);

  function push(value: string) {
    if (value.trim().length > 1) {
      router.replace(`/search?q=${encodeURIComponent(value.trim())}`, { scroll: false });
    } else if (value.trim().length === 0) {
      router.replace('/search', { scroll: false });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => push(value), 320);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    push(q);
  }

  function handleClear() {
    setQ('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    router.replace('/search', { scroll: false });
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-4)] pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={handleChange}
          placeholder="Search guides — e.g. passport, business registration"
          className="w-full pl-10 pr-9 py-3 rounded-xl border border-[var(--color-surface3)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-all text-sm"
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        {q && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-4)] hover:text-[var(--color-ink)] transition-colors"
            aria-label="Clear search"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
