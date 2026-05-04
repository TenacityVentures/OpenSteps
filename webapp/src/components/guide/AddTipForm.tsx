'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import { useUser } from '@/hooks/useUser';
import { addTip } from '@/app/[country]/guide/[slug]/actions';
import type { Tip } from '@opensteps/types';

interface Props {
  guideId: string;
  country: string;
  onAdded: (tip: Tip) => void;
}

export function AddTipForm({ guideId, country, onAdded }: Props): JSX.Element {
  const { user, loading } = useUser();
  const router = useRouter();
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!loading && !user) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/auth/signin?next=/${country}/guide/${guideId}`)}
        className="w-full py-2.5 text-sm text-[var(--color-ink-3)] border border-dashed border-[var(--color-surface3)] rounded-xl hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
      >
        Sign in to add a tip
      </button>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        const tip = await addTip(guideId, text);
        onAdded(tip);
        setText('');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add tip');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors resize-none"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share a tip from your experience…"
        disabled={isPending || loading}
      />
      {error && <p className="text-xs text-[var(--color-red)]">{error}</p>}
      {text.trim() && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-1.5 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <Spinner size={12} /> Adding…
              </span>
            ) : 'Add tip'}
          </button>
        </div>
      )}
    </form>
  );
}
