import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { COUNTRY_MAP } from '@opensteps/constants';
import type { CountryCode } from '@opensteps/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.org';

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ country: string }> },
) {
  const { country } = await params;
  const meta = COUNTRY_MAP[country as CountryCode];
  if (!meta?.active) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const db = supabase();
  const { data: guides } = await db
    .from('guides')
    .select('id, title, slug, description, category, created_at')
    .eq('published', true)
    .eq('country', country)
    .order('created_at', { ascending: false })
    .limit(50);

  const items = (guides ?? [])
    .map(
      (g) => `
    <item>
      <title><![CDATA[${g.title}]]></title>
      <link>${BASE_URL}/${country}/guide/${g.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${country}/guide/${g.slug}</guid>
      <description><![CDATA[${g.description ?? ''}]]></description>
      <category><![CDATA[${g.category ?? ''}]]></category>
      <pubDate>${new Date(g.created_at as string).toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/modules/content/">
  <channel>
    <title>OpenSteps — ${meta.name}</title>
    <link>${BASE_URL}/${country}</link>
    <description>Community-verified step-by-step guides for government processes in ${meta.name}.</description>
    <language>en</language>
    <copyright>OpenSteps contributors</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/${country}/feed" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.svg</url>
      <title>OpenSteps</title>
      <link>${BASE_URL}/${country}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
