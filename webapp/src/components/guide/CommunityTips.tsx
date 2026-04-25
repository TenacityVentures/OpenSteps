import type { Tip } from '@opensteps/types';
import { formatRelative } from '@/lib/format';

export default function CommunityTips({ tips }: { tips: Tip[] }) {
  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
        Community tips
      </h2>
      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-xl bg-white border border-[var(--color-surface3)]"
          >
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
              <span className="text-xs font-mono text-[var(--color-ink-3)] ml-auto">
                ↑ {tip.upvotes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
