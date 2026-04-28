'use client';

import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import type { Tip, Step } from '@opensteps/types';
import { formatRelative } from '@/lib/format';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/useUser';
import { AddTipForm } from './AddTipForm';
import { TipUpvoteButton } from './TipUpvoteButton';

interface Props {
  tips: Tip[];
  guideId: string;
  steps: Step[];
  country: string;
}

export default function CommunityTips({ tips: initialTips, guideId, steps, country }: Props): JSX.Element {
  const [tips, setTips] = useState<Tip[]>(initialTips);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const { user } = useUser();

  // Fetch user's upvotes
  useEffect(() => {
    if (!user) { setUpvotedIds(new Set()); return; }
    const client = createClient();
    client
      .from('tip_upvotes')
      .select('tip_id')
      .eq('user_id', user.id)
      .in('tip_id', tips.map((t) => t.id))
      .then(({ data }) => {
        if (data) setUpvotedIds(new Set(data.map((r: { tip_id: string }) => r.tip_id)));
      });
  }, [user, tips.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Realtime: new tips
  useEffect(() => {
    const client = createClient();
    const channel = client
      .channel(`tips:${guideId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tips', filter: `guide_id=eq.${guideId}` },
        (payload) => {
          setTips((prev) => {
            if (prev.some((t) => t.id === (payload.new as Tip).id)) return prev;
            return [payload.new as Tip, ...prev];
          });
        },
      )
      .subscribe();
    return () => { void client.removeChannel(channel); };
  }, [guideId]);

  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
        Community tips
      </h2>

      <div className="space-y-4">
        <AddTipForm
          guideId={guideId}
          country={country}
          onAdded={(tip) => setTips((prev) => [tip, ...prev])}
        />

        {tips.length === 0 && (
          <p className="text-sm text-[var(--color-ink-4)] italic py-4 text-center">
            No tips yet. Be the first to share one!
          </p>
        )}

        {tips.map((tip) => {
          const step = tip.step_id ? steps.find((s) => s.id === tip.step_id) : null;
          return (
            <div
              key={tip.id}
              className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]"
            >
              {step && (
                <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-green)] mb-1.5">
                  Step {step.n}: {step.title}
                </p>
              )}
              <p className="font-serif text-[var(--color-ink-2)] text-base leading-relaxed italic">
                &ldquo;{tip.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-6 h-6 rounded-full bg-[var(--color-green-soft)] text-[var(--color-green)] flex items-center justify-center text-xs font-bold">
                  C
                </div>
                <span className="text-xs font-mono text-[var(--color-ink-3)]">
                  {formatRelative(tip.created_at)}
                </span>
                <span className="ml-auto">
                  <TipUpvoteButton
                    tipId={tip.id}
                    initialCount={tip.upvotes}
                    initiallyUpvoted={upvotedIds.has(tip.id)}
                    country={country}
                    guideId={guideId}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
