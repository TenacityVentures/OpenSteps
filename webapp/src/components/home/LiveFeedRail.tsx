'use client';

import { useEffect, useState } from 'react';
import type { FeedItem } from '@opensteps/types';
import { createClient } from '@/lib/supabase/client';
import { formatRelative } from '@/lib/format';

const TYPE_LABEL: Record<string, string> = {
  edit: '✏️ edited',
  verify: '✓ verified',
  contribute: '+ contributed',
  flag: '⚑ flagged',
};

export default function LiveFeedRail({ initialFeed }: { initialFeed: FeedItem[] }) {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed);

  useEffect(() => {
    const client = createClient();
    const channel = client
      .channel('community-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'community_feed' },
        (payload) => {
          setFeed((prev) => [payload.new as FeedItem, ...prev].slice(0, 15));
        },
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  return (
    <section>
      <h3 className="text-sm font-mono uppercase tracking-widest text-[--color-ink-3] mb-3">
        Live activity
      </h3>
      <div className="space-y-2">
        {feed.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[--color-surface3] text-sm"
          >
            <div className="w-7 h-7 rounded-full bg-[--color-surface2] flex items-center justify-center text-xs font-bold flex-none text-[--color-green]">
              {item.type === 'verify' ? '✓' : item.type === 'edit' ? '✏' : '+'}
            </div>
            <div className="grow min-w-0">
              <div className="text-[--color-ink-2] leading-snug line-clamp-2">
                {item.description}
              </div>
              <div className="text-[10px] font-mono text-[--color-ink-3] mt-1">
                {TYPE_LABEL[item.type] ?? item.type} · {formatRelative(item.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
