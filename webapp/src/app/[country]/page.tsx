import type { JSX } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getGuides, getCategories, getFeed, getTopVerifiers } from '@opensteps/supabase';
import type { CountryCode } from '@opensteps/types';
import SearchHero from '@/components/home/SearchHero';
import IntentMatcher from '@/components/home/IntentMatcher';
import CategoryGrid from '@/components/home/CategoryGrid';
import GuideList from '@/components/home/GuideList';
import LiveFeedRail from '@/components/home/LiveFeedRail';
import TrustStats from '@/components/home/TrustStats';
import { TopContributors } from '@/components/home/TopContributors';

export const revalidate = 60;

interface Props {
  params: Promise<{ country: string }>;
}

export default async function CountryHomePage({ params }: Props): Promise<JSX.Element> {
  const { country } = await params;
  const client = await createClient();

  const [guides, categories, feed, topVerifiers] = await Promise.all([
    getGuides(client, { country: country as CountryCode, limit: 12, orderBy: 'follower_count' }),
    getCategories(client),
    getFeed(client, 10),
    getTopVerifiers(client, 5),
  ]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section>
        <SearchHero />
        <IntentMatcher />
      </section>

      <TrustStats guides={guides} />

      <section>
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
          Browse by topic
        </h2>
        <CategoryGrid categories={categories} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--color-ink-3)] mb-4">
            Most followed
          </h2>
          <GuideList guides={guides} />
        </section>

        <aside className="space-y-6">
          <LiveFeedRail initialFeed={feed} />
          <TopContributors verifiers={topVerifiers} />
        </aside>
      </div>
    </div>
  );
}
