'use client';

import type { JSX, CSSProperties } from 'react';
import { useState, useTransition, useRef, useEffect } from 'react';
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

const SWIPE_THRESHOLD = 72;
const FLING_PX = 520;

type Phase = 'idle' | 'dragging' | 'exiting';

export function SwipeStack({ guides, cardIndex, onAdvance, onRetreat, country }: Props): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flagMode, setFlagMode] = useState(false);
  const [reason, setReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  const dragging = useRef(false);
  const startX = useRef(0);
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [exitDir, setExitDir] = useState<1 | -1>(1);

  const guide = guides[cardIndex];
  const nextGuide = guides[cardIndex + 1];

  // Reset card state whenever the displayed card changes
  useEffect(() => {
    setOffset(0);
    setPhase('idle');
    setFlagMode(false);
    setReason('');
    setActionError(null);
  }, [cardIndex]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase === 'exiting') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft' && guides.length > 1) triggerExit(-1);
      if (e.key === 'ArrowRight' && cardIndex > 0) triggerExit(1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, cardIndex, guides.length]);

  function triggerExit(dir: 1 | -1) {
    setExitDir(dir);
    setPhase('exiting');
    setTimeout(() => {
      if (dir === -1) onAdvance();
      else onRetreat();
    }, 230);
  }

  // Pointer handlers — only on the front card
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (phase !== 'idle' || isPending) return;
    dragging.current = true;
    startX.current = e.clientX;
    setPhase('dragging');
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setOffset(e.clientX - startX.current);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - startX.current;
    if (dx < -SWIPE_THRESHOLD) {
      triggerExit(-1);
    } else if (dx > SWIPE_THRESHOLD && cardIndex > 0) {
      triggerExit(1);
    } else {
      setPhase('idle');
      setOffset(0);
    }
  }

  function onPointerCancel() {
    dragging.current = false;
    setPhase('idle');
    setOffset(0);
  }

  function handleApprove() {
    if (!guide) return;
    setActionError(null);
    startTransition(async () => {
      try {
        await editorApprove(guide.id);
        triggerExit(-1);
        router.refresh();
      } catch (e) {
        setActionError(e instanceof Error ? e.message : 'Failed to approve.');
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
        triggerExit(-1);
      } catch (e) {
        setActionError(e instanceof Error ? e.message : 'Failed to flag.');
      }
    });
  }

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--color-green-tint)] flex items-center justify-center text-2xl">✓</div>
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">All caught up!</h3>
        <p className="text-sm text-[var(--color-ink-3)]">No more guides waiting for review.</p>
        <Link href={`/${country}`} className="mt-1 text-sm text-[var(--color-green)] hover:underline">
          Browse published guides →
        </Link>
      </div>
    );
  }

  // ── Derived styles ────────────────────────────────────────────────────────

  // How much the drag has "committed" (0 → 1 over first 100px)
  const dragProgress = phase === 'dragging' ? Math.min(Math.abs(offset) / 100, 1) : 0;

  // Behind card: starts at scale 0.96 / translateY 10px, rises toward full as you drag
  const behindScale   = phase === 'exiting' ? 1 : 0.96 + dragProgress * 0.04;
  const behindY       = phase === 'exiting' ? 0 : 10  - dragProgress * 10;
  const behindOpacity = phase === 'exiting' ? 1 : 0.72 + dragProgress * 0.28;

  const behindStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    transform: `scale(${behindScale}) translateY(${behindY}px)`,
    transformOrigin: 'center bottom',
    opacity: behindOpacity,
    transition:
      phase === 'exiting'
        ? 'transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out'
        : phase === 'idle'
        ? 'transform 0.22s ease-out, opacity 0.22s ease-out'
        : 'none',
    pointerEvents: 'none',
  };

  // Front card: follows drag, then flings off
  const frontX     = phase === 'exiting' ? exitDir * FLING_PX : offset;
  const frontRot   = phase === 'exiting' ? exitDir * 14 : offset * 0.04;
  const frontOpacity = phase === 'exiting' ? 0 : 1 - Math.abs(offset) / 450;

  const frontStyle: CSSProperties = {
    position: 'relative',
    zIndex: 2,
    transform: `translateX(${frontX}px) rotate(${frontRot}deg)`,
    opacity: frontOpacity,
    transition:
      phase === 'exiting'
        ? 'transform 0.22s ease-in, opacity 0.18s ease-in'
        : 'none',
    cursor: phase === 'dragging' ? 'grabbing' : 'grab',
    touchAction: 'pan-y',
    userSelect: 'none',
    willChange: 'transform',
  };

  return (
    <div className="space-y-4">
      {/* ── Card stack ───────────────────────────────────────────────── */}
      <div className="relative overflow-visible pb-2">
        {/* Behind card — full GuideCard, slightly shrunk and shifted */}
        {nextGuide && (
          <div style={behindStyle}>
            <GuideCard guide={nextGuide} index={cardIndex + 1} total={guides.length} />
          </div>
        )}

        {/* Front card — interactive */}
        <div
          style={frontStyle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <GuideCard guide={guide} index={cardIndex} total={guides.length} />
        </div>
      </div>

      {/* ── Swipe hint ───────────────────────────────────────────────── */}
      {guides.length > 1 && (
        <p className="text-center text-[10px] font-mono text-[var(--color-ink-4)] tracking-wider select-none">
          {cardIndex > 0 ? '← ' : ''}swipe or use arrow keys{guides[cardIndex + 1] ? ' →' : ''}
        </p>
      )}

      {/* ── Flag reason input ────────────────────────────────────────── */}
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

      {/* ── Action buttons ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleFlag}
          disabled={isPending || phase === 'exiting'}
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
          disabled={isPending || phase === 'exiting'}
          className="flex-1 py-2.5 rounded-xl bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Approve'}
        </button>
      </div>
    </div>
  );
}
