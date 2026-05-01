'use client';

import type { JSX } from 'react';
import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
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
  onRetreat: () => void;
  country: string;
}

const SWIPE_THRESHOLD = 80;
const FLING_DISTANCE = 500;

export function SwipeStack({ guides, cardIndex, onAdvance, onRetreat, country }: Props): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flagMode, setFlagMode] = useState(false);
  const [reason, setReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  // Drag state
  const dragging = useRef(false);
  const startX = useRef(0);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  const guide = guides[cardIndex];

  // Reset card position whenever the guide changes
  useEffect(() => {
    setOffset(0);
    setAnimating(false);
    setFlagMode(false);
    setReason('');
    setActionError(null);
  }, [cardIndex]);

  const fling = useCallback((direction: 'left' | 'right', afterFling: () => void) => {
    setAnimating(true);
    setOffset(direction === 'left' ? -FLING_DISTANCE : FLING_DISTANCE);
    setTimeout(() => {
      afterFling();
      // offset + animating reset is handled by the cardIndex useEffect above
    }, 220);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (isPending || animating || !guide) return;
    dragging.current = true;
    startX.current = e.clientX;
    setAnimating(false);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setOffset(e.clientX - startX.current);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const finalOffset = e.clientX - startX.current;

    if (finalOffset < -SWIPE_THRESHOLD) {
      // Swipe left → next
      fling('left', onAdvance);
    } else if (finalOffset > SWIPE_THRESHOLD && cardIndex > 0) {
      // Swipe right → previous
      fling('right', onRetreat);
    } else {
      // Snap back
      setAnimating(true);
      setOffset(0);
      setTimeout(() => setAnimating(false), 200);
    }
  }

  function onPointerCancel() {
    dragging.current = false;
    setAnimating(true);
    setOffset(0);
    setTimeout(() => setAnimating(false), 200);
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && cardIndex > 0) fling('right', onRetreat);
      if (e.key === 'ArrowLeft') fling('left', onAdvance);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cardIndex, fling, onAdvance, onRetreat]);

  function handleApprove() {
    if (!guide) return;
    setActionError(null);
    startTransition(async () => {
      try {
        await editorApprove(guide.id);
        fling('left', onAdvance);
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
        fling('left', onAdvance);
      } catch (e) {
        setActionError(e instanceof Error ? e.message : 'Failed to flag. Please try again.');
      }
    });
  }

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green-tint)] flex items-center justify-center text-3xl">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">All caught up!</h3>
        <p className="text-sm text-[var(--color-ink-3)]">No more guides waiting for review.</p>
        <Link href={`/${country}`} className="mt-2 text-sm text-[var(--color-green)] hover:underline">
          Browse published guides →
        </Link>
      </div>
    );
  }

  // Derived drag visual hints
  const clampedOffset = Math.max(-200, Math.min(200, offset));
  const rotate = clampedOffset * 0.04;
  const opacity = 1 - Math.abs(clampedOffset) / 400;
  const showNext = clampedOffset < -30;
  const showPrev = clampedOffset > 30 && cardIndex > 0;

  return (
    <div className="space-y-4">
      {/* Card wrapper — handles drag */}
      <div className="relative select-none">
        {/* Direction hint overlays */}
        {showNext && (
          <div
            className="absolute inset-0 z-10 rounded-2xl flex items-center justify-end pr-6 pointer-events-none"
            style={{ opacity: Math.min(1, Math.abs(clampedOffset) / 120) }}
          >
            <span className="text-xs font-mono font-bold text-[var(--color-ink-3)] bg-white/80 px-2 py-1 rounded-lg">
              Next →
            </span>
          </div>
        )}
        {showPrev && (
          <div
            className="absolute inset-0 z-10 rounded-2xl flex items-center justify-start pl-6 pointer-events-none"
            style={{ opacity: Math.min(1, Math.abs(clampedOffset) / 120) }}
          >
            <span className="text-xs font-mono font-bold text-[var(--color-ink-3)] bg-white/80 px-2 py-1 rounded-lg">
              ← Back
            </span>
          </div>
        )}

        <div
          className="touch-pan-y"
          style={{
            transform: `translateX(${animating ? 0 : clampedOffset}px) rotate(${animating ? 0 : rotate}deg)`,
            opacity: animating ? 1 : opacity,
            transition: animating ? 'transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease' : 'none',
            cursor: dragging.current ? 'grabbing' : 'grab',
            willChange: 'transform',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <GuideCard guide={guide} index={cardIndex} total={guides.length} />
        </div>
      </div>

      {/* Swipe hint — only when multiple guides */}
      {guides.length > 1 && (
        <p className="text-center text-[10px] font-mono text-[var(--color-ink-4)] tracking-wider select-none">
          ← swipe to navigate · {cardIndex + 1} of {guides.length} →
        </p>
      )}

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
          disabled={isPending || animating}
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
          disabled={isPending || animating}
          className="flex-1 py-2.5 rounded-xl bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Approve'}
        </button>
      </div>
    </div>
  );
}
