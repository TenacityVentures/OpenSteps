import { createClient } from '@/lib/supabase/server';
import {
  getGuides,
  getCategories,
  getFeed,
  getTopVerifiers,
} from '@opensteps/supabase';
import SearchHero from '@/components/home/SearchHero';
import IntentMatcher from '@/components/home/IntentMatcher';
import CategoryGrid from '@/components/home/CategoryGrid';
import GuideList from '@/components/home/GuideList';
import LiveFeedRail from '@/components/home/LiveFeedRail';
import TrustStats from '@/components/home/TrustStats';

export const revalidate = 60;

export default async function HomePage() {
  const client = await createClient();

  const [guides, categories, feed, topVerifiers] = await Promise.all([
    getGuides(client, { limit: 12, orderBy: 'follower_count' }),
    getCategories(client),
    getFeed(client, 10),
    getTopVerifiers(client, 5),
  ]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Search hero + intent matcher */}
      <section>
        <SearchHero />
        <IntentMatcher />
      </section>

      {/* Live trust stats */}
      <TrustStats guides={guides} />

      {/* Category grid */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
          Browse by topic
        </h2>
        <CategoryGrid categories={categories} />
      </section>

      {/* Main two-column: guides + live feed */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
            Most followed
          </h2>
          <GuideList guides={guides} />
        </section>

        <aside className="space-y-6">
          <LiveFeedRail initialFeed={feed} />
          <section>
            <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-3">
              Top contributors
            </h3>
            <div className="space-y-2">
              {topVerifiers.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[var(--color-surface3)]"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center text-xs font-bold flex-none">
                    {v.display_name[0]}
                  </div>
                  <div className="grow min-w-0">
                    <div className="font-semibold text-sm truncate">{v.display_name}</div>
                    <div className="text-xs font-mono text-[var(--color-ink-3)]">
                      {v.verification_count} verified
                    </div>
                  </div>
                  {v.role === 'editor' ? (
                    <span className="text-[9px] font-mono tracking-widest border border-current px-1.5 py-0.5 rounded uppercase opacity-60">
                      Editor
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[var(--color-green)] font-semibold">
                      {v.accuracy_pct}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
