'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { communityVerify } from '@/app/[country]/verify/actions';

interface Props {
  guideId: string;
  verificationCount: number;
  country: string;
}

export function VerifyBanner({ guideId, verificationCount, country }: Props): JSX.Element {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleVerify() {
    if (!user) {
      router.push(`/auth/signin?next=/${country}/guide/${guideId}`);
      return;
    }
    startTransition(async () => {
      try {
        await communityVerify(guideId);
        setDone(true);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to verify');
      }
    });
  }

  const needed = Math.max(0, 5 - verificationCount);

  return (
    <div className="rounded-xl border border-[var(--color-green-soft)] bg-[var(--color-green-tint)] p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--color-green)]">
            Pending community review
          </p>
          <p className="text-xs text-[var(--color-ink-3)]">
            {verificationCount} / 5 verified · {needed} more needed to publish
          </p>
          {/* Progress bar */}
          <div className="h-1.5 w-48 bg-white rounded-full overflow-hidden border border-[var(--color-green-soft)]">
            <div
              className="h-full bg-[var(--color-green)] rounded-full transition-all"
              style={{ width: `${Math.min(100, (verificationCount / 5) * 100)}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          {done ? (
            <span className="text-sm font-semibold text-[var(--color-green)]">Verified ✓</span>
          ) : (
            <button
              type="button"
              onClick={handleVerify}
              disabled={isPending || loading}
              className="px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-semibold hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
            >
              {isPending ? 'Verifying…' : loading ? '…' : user ? 'Verify this guide' : 'Sign in to verify'}
            </button>
          )}
          {error && <p className="text-xs text-[var(--color-red)]">{error}</p>}
        </div>
      </div>
    </div>
  );
}
