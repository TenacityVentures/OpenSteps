'use client';

import type { JSX } from 'react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';

export function UserMenu(): JSX.Element {
  const { user, loading } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/sl');
    router.refresh();
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-[var(--color-surface3)] animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className="text-sm font-medium px-3 py-1.5 rounded-lg border border-[var(--color-surface3)] text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
      >
        Sign in
      </Link>
    );
  }

  const displayName: string = (user.user_metadata?.['display_name'] as string | undefined) ?? user.email?.split('@')[0] ?? 'You';
  const initial = displayName[0]?.toUpperCase() ?? '?';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white text-sm font-bold flex items-center justify-center hover:bg-[var(--color-green-mid)] transition-colors"
        aria-label="Account menu"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-[var(--color-surface3)] rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-surface3)]">
            <p className="text-sm font-semibold text-[var(--color-ink)] truncate">{displayName}</p>
            <p className="text-xs text-[var(--color-ink-4)] truncate">{user.email}</p>
          </div>

          <nav className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
            >
              My contributions
            </Link>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
            >
              Editor queue
            </Link>
          </nav>

          <div className="border-t border-[var(--color-surface3)] py-1">
            <button
              type="button"
              onClick={signOut}
              className="w-full text-left px-4 py-2 text-sm text-[var(--color-red)] hover:bg-[var(--color-surface2)] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
