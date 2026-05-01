import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { ACTIVE_COUNTRY_CODES, CATEGORY_MAP } from '@opensteps/constants';
import type { CategoryKey } from '@opensteps/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.org';

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = supabase();

  const { data: guides } = await db
    .from('guides')
    .select('slug, country, created_at, category')
    .eq('published', true);

  const guideUrls: MetadataRoute.Sitemap = (guides ?? []).map((g) => ({
    url: `${BASE_URL}/${g.country}/guide/${g.slug}`,
    lastModified: new Date(g.created_at as string),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const countryUrls: MetadataRoute.Sitemap = ACTIVE_COUNTRY_CODES.flatMap((code) => [
    { url: `${BASE_URL}/${code}`,             changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/${code}/verify`,      changeFrequency: 'hourly', priority: 0.7 },
    { url: `${BASE_URL}/${code}/leaderboard`, changeFrequency: 'daily',  priority: 0.6 },
    { url: `${BASE_URL}/${code}/contribute`,  changeFrequency: 'monthly',priority: 0.5 },
  ]);

  const categoryUrls: MetadataRoute.Sitemap = ACTIVE_COUNTRY_CODES.flatMap((code) =>
    Object.keys(CATEGORY_MAP).map((key) => ({
      url: `${BASE_URL}/${code}/category/${key as CategoryKey}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  );

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,              changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/search`,        changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/legal/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/legal/terms`,   changeFrequency: 'yearly', priority: 0.2 },
  ];

  return [...staticUrls, ...countryUrls, ...categoryUrls, ...guideUrls];
}
