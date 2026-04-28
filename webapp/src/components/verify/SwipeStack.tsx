'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Guide } from '@opensteps/types';
import { GuideCard } from './GuideCard';
import { editorApprove, editorFlag } from '@/app/[country]/verify/actions';

type PendingGuide = Pick<Guide, 'id' | 'slug' | 'title' | 'category' | 'description' | 'steps_count' | 'total_cost' | 'duration_days' | 'created_at'>;

interface Props {
  guides: PendingGuide[];
  cardIndex: number;
  onAdvance: () => void;
  country: string;
}

export function SwipeStack({ guides, cardIndex, onAdvance, country }: Props): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flagMode, setFlagMode] = useState(false);
  const [reason, setReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  const guide = guides[cardIndex];

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green-tint)] flex items-center justify-center text-3xl">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">All caught up!</h3>
        <p className="text-sm text-[var(--color-ink-3)]">No more guides waiting for review.</p>
        <Link
          href={`/${country}`}
          className="mt-2 text-sm text-[var(--color-green)] hover:underline"
        >
          Browse published guides →
        </Link>
      </div>
    );
  }

  function handleApprove() {
    if (!guide) return;
    setActionError(null);
    startTransition(async () => {
      try {
        await editorApprove(guide.id);
        setFlagMode(false);
        setReason('');
        onAdvance();
        router.refresh();
      } catch (e) {
        setActionError(e instanceof Error ? e.message : 'Failed to approve. Please try again.');
      }
    });
  }

  function handleFlag() {
    if (!flagMode) { setFlagMode(true); return; }
    if (!guide) return;
    setActionError(null);
    startTransition(async () => {
      try {
        await editorFlag(guide.id, reason || 'Needs revision');
        setFlagMode(false);
        setReason('');
        onAdvance();
      } catch (e) {
        setActionError(e instanceof Error ? e.message : 'Failed to flag. Please try again.');
      }
    });
  }

  return (
    <div className="space-y-4">
      <GuideCard guide={guide} index={cardIndex} total={guides.length} />

      {flagMode && (
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] focus:border-[var(--color-red)] transition-colors"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (e.g. Missing steps, inaccurate cost)"
            onKeyDown={(e) => e.key === 'Enter' && handleFlag()}
            autoFocus
          />
          <button
            type="button"
            onClick={() => { setFlagMode(false); setReason(''); }}
            className="px-3 py-2 text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {actionError && <p className="text-xs text-[var(--color-red)]">{actionError}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleFlag}
          disabled={isPending}
          className="flex-1 py-2.5 rounded-xl border-2 border-[var(--color-red-soft)] bg-[var(--color-red-soft)] text-[var(--color-red)] text-sm font-medium hover:bg-[var(--color-red)] hover:text-white hover:border-[var(--color-red)] transition-colors disabled:opacity-50"
        >
          {flagMode ? 'Confirm flag' : 'Flag'}
        </button>

        <Link
          href={`/${country}/verify/${guide.slug}`}
          className="px-4 py-2.5 rounded-xl border border-[var(--color-surface3)] bg-white text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] hover:text-[var(--color-ink)] transition-colors whitespace-nowrap"
        >
          Review →
        </Link>

        <button
          type="button"
          onClick={handleApprove}
          disabled={isPending}
          className="flex-1 py-2.5 rounded-xl bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Approve'}
        </button>
      </div>
    </div>
  );
}
