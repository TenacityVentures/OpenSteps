'use client';

import type { JSX } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toaster';

export function UserMenu(): JSX.Element {
  const { user, loading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click/touch
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [close]);

  // Focus first item when menu opens; return focus to trigger on close
  useEffect(() => {
    if (open) {
      itemRefs.current[0]?.focus();
    }
  }, [open]);

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    const focused = document.activeElement;
    const currentIdx = items.indexOf(focused as HTMLElement);

    if (e.key === 'Escape') {
      close();
      triggerRef.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentIdx + 1) % items.length;
      items[next]?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentIdx - 1 + items.length) % items.length;
      items[prev]?.focus();
    }
    if (e.key === 'Tab') {
      close();
    }
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    close();
    toast("You've been signed out");
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div
        className="w-8 h-8 rounded-full bg-[var(--color-surface3)] animate-pulse"
        aria-label="Loading account"
        role="status"
      />
    );
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

  const displayName: string =
    (user.user_metadata?.['display_name'] as string | undefined) ??
    user.email?.split('@')[0] ??
    'You';
  const initial = displayName[0]?.toUpperCase() ?? '?';
  const menuId = 'user-menu';

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Account menu for ${displayName}`}
        className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white text-sm font-bold flex items-center justify-center hover:bg-[var(--color-green-mid)] transition-colors"
      >
        <span aria-hidden="true">{initial}</span>
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label="Account menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 mt-2 w-52 bg-white border border-[var(--color-surface3)] rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {/* User info — not focusable, just informational */}
          <div className="px-4 py-3 border-b border-[var(--color-surface3)]" aria-hidden="true">
            <p className="text-sm font-semibold text-[var(--color-ink)] truncate">{displayName}</p>
            <p className="text-xs text-[var(--color-ink-4)] truncate">{user.email}</p>
          </div>

          <nav>
            <Link
              href="/dashboard"
              role="menuitem"
              ref={(el) => { itemRefs.current[0] = el; }}
              onClick={close}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors focus:outline-none focus:bg-[var(--color-surface2)]"
            >
              My contributions
            </Link>
            <Link
              href="/admin"
              role="menuitem"
              ref={(el) => { itemRefs.current[1] = el; }}
              onClick={close}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors focus:outline-none focus:bg-[var(--color-surface2)]"
            >
              Editor queue
            </Link>
          </nav>

          <div className="border-t border-[var(--color-surface3)]">
            <button
              type="button"
              role="menuitem"
              ref={(el) => { itemRefs.current[2] = el; }}
              onClick={signOut}
              className="w-full text-left px-4 py-2 text-sm text-[var(--color-red)] hover:bg-[var(--color-surface2)] transition-colors focus:outline-none focus:bg-[var(--color-surface2)]"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
