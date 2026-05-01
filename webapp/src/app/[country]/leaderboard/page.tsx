import type { JSX } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getTopVerifiers } from '@opensteps/supabase';
import { COUNTRY_MAP } from '@opensteps/constants';
import type { CountryCode, Verifier } from '@opensteps/types';
import {
  LeaderboardClient,
  type TipperStat,
  type CountryRankItem,
} from '@/components/leaderboard/LeaderboardClient';

export const metadata: Metadata = { title: 'Leaderboard — OpenSteps' };
export const revalidate = 120;

interface Props {
  params: Promise<{ country: string }>;
}

export default async function LeaderboardPage({ params }: Props): Promise<JSX.Element> {
  const { country } = await params;
  const client = await createClient();

  const [
    verifiers,
    { data: topGuidesData },
    { data: topTipsData },
    { data: allTipsData },
    { count: totalVerifications },
    { count: totalTipCount },
    { count: totalGuideCount },
    { data: allGuideCountries },
  ] = await Promise.all([
    getTopVerifiers(client, 50),
    client
      .from('guides')
      .select('id, title, slug, country, trust_score, follower_count, category')
      .eq('published', true)
      .order('trust_score', { ascending: false })
      .limit(8),
    client
      .from('tips')
      .select('id, text, upvotes, guide_id, author_id')
      .order('upvotes', { ascending: false })
      .limit(8),
    client.from('tips').select('author_id, upvotes').not('author_id', 'is', null),
    client.from('guide_verifications').select('*', { count: 'exact', head: true }),
    client.from('tips').select('*', { count: 'exact', head: true }),
    client.from('guides').select('*', { count: 'exact', head: true }).eq('published', true),
    client.from('guides').select('country').eq('published', true),
  ]);

  // Guide titles for top tips
  const tipGuideIds = [...new Set((topTipsData ?? []).map((t) => t.guide_id))];
  const { data: tipGuideTitles } = tipGuideIds.length > 0
    ? await client.from('guides').select('id, title, slug, country').in('id', tipGuideIds)
    : { data: [] };
  const guideById = Object.fromEntries((tipGuideTitles ?? []).map((g) => [g.id, g]));

  // Top tippers — aggregate in JS
  const tipperMap: Record<string, { tipCount: number; totalUpvotes: number }> = {};
  for (const t of allTipsData ?? []) {
    const id = t.author_id as string;
    tipperMap[id] = {
      tipCount: (tipperMap[id]?.tipCount ?? 0) + 1,
      totalUpvotes: (tipperMap[id]?.totalUpvotes ?? 0) + (t.upvotes as number),
    };
  }
  const topTippers: TipperStat[] = Object.entries(tipperMap)
    .sort(([, a], [, b]) => b.tipCount - a.tipCount)
    .slice(0, 5)
    .map(([id, stats]) => ({ id, ...stats, verifier: verifiers.find((v) => v.id === id) }));

  // Country guide counts
  const countryCount: Record<string, number> = {};
  for (const g of allGuideCountries ?? []) {
    const c = g.country as string;
    countryCount[c] = (countryCount[c] ?? 0) + 1;
  }
  const countryRankings: CountryRankItem[] = Object.entries(countryCount)
    .sort(([, a], [, b]) => b - a)
    .map(([code, count]) => ({ code, count, meta: COUNTRY_MAP[code as CountryCode] }));

  const editors = verifiers.filter((v) => v.role === 'editor');
  const nonEditors = verifiers.filter((v) => v.role !== 'editor');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <LeaderboardClient
        country={country}
        verifiers={verifiers}
        editors={editors}
        nonEditors={nonEditors}
        topGuides={topGuidesData ?? []}
        topTips={topTipsData ?? []}
        topTippers={topTippers}
        countryRankings={countryRankings}
        guideById={guideById as Record<string, { id: string; title: string; slug: string; country: string }>}
        totalGuideCount={totalGuideCount ?? 0}
        totalVerifications={totalVerifications ?? 0}
        totalTipCount={totalTipCount ?? 0}
      />
    </div>
  );
}
