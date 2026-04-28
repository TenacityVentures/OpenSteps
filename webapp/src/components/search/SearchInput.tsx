'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchInput(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get('q') ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search guides…"
        className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-surface3)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-all"
        autoFocus
        autoComplete="off"
      />
      <button
        type="submit"
        className="px-4 py-2.5 rounded-xl bg-[var(--color-green)] text-white font-medium hover:bg-[var(--color-green-mid)] transition-colors"
      >
        Search
      </button>
    </form>
  );
}
