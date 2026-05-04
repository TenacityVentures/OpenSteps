'use client';

import type { JSX } from 'react';
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { upvoteTip, removeUpvote } from '@/app/[country]/guide/[slug]/actions';

interface Props {
  tipId: string;
  initialCount: number;
  initiallyUpvoted: boolean;
  country: string;
  guideId: string;
}

export function TipUpvoteButton({ tipId, initialCount, initiallyUpvoted, country, guideId }: Props): JSX.Element {
  const { user } = useUser();
  const router = useRouter();
  const [upvoted, setUpvoted] = useState(initiallyUpvoted);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  // Sync when parent delivers fresh server data (after revalidatePath + router.refresh)
  useEffect(() => { setUpvoted(initiallyUpvoted); }, [initiallyUpvoted]);
  useEffect(() => { setCount(initialCount); }, [initialCount]);

  function handleClick() {
    if (!user) {
      router.push(`/auth/signin?next=/${country}/guide/${guideId}`);
      return;
    }
    const willUpvote = !upvoted;
    setUpvoted(willUpvote);
    setCount((c) => c + (willUpvote ? 1 : -1));

    startTransition(async () => {
      try {
        if (willUpvote) {
          await upvoteTip(tipId);
        } else {
          await removeUpvote(tipId);
        }
      } catch {
        // revert optimistic update
        setUpvoted(!willUpvote);
        setCount((c) => c + (willUpvote ? -1 : 1));
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={[
        'flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded transition-colors',
        upvoted
          ? 'text-[var(--color-green)] bg-[var(--color-green-tint)]'
          : 'text-[var(--color-ink-4)] hover:text-[var(--color-ink-3)]',
      ].join(' ')}
      aria-label={upvoted ? 'Remove upvote' : 'Upvote'}
    >
      ↑ {count}
    </button>
  );
}
