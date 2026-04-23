import type { SupabaseClient } from '@supabase/supabase-js';
import type { Guide, CategoryKey } from '@opensteps/types';

export interface GetGuidesParams {
  category?: CategoryKey;
  limit?: number;
  orderBy?: 'follower_count' | 'trust_score' | 'last_verified_at';
}

/** Fetch published guides for listing (home, category browse) */
export async function getGuides(
  client: SupabaseClient,
  { category, limit = 20, orderBy = 'follower_count' }: GetGuidesParams = {},
): Promise<Guide[]> {
  let query = client
    .from('guides')
    .select('*')
    .eq('published', true)
    .order(orderBy, { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Guide[];
}

/** Fetch a single guide by slug */
export async function getGuideBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<Guide | null> {
  const { data, error } = await client
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data as Guide;
}

/** Full-text search via the generated fts tsvector column */
export async function searchGuides(
  client: SupabaseClient,
  query: string,
  limit = 20,
): Promise<Guide[]> {
  const { data, error } = await client
    .from('guides')
    .select('*')
    .eq('published', true)
    .textSearch('fts', query, { type: 'websearch', config: 'english' })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Guide[];
}

/** Guides for a specific category page */
export async function getGuidesByCategory(
  client: SupabaseClient,
  category: CategoryKey,
  limit = 40,
): Promise<Guide[]> {
  return getGuides(client, { category, limit, orderBy: 'trust_score' });
}

/** IDs + titles of related guides (for the sidebar) */
export async function getRelatedGuides(
  client: SupabaseClient,
  guideId: string,
): Promise<Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'>[]> {
  const { data, error } = await client
    .from('related_guides')
    .select('related_guide:guides!related_guide_id(id, title, slug, category, trust_score)')
    .eq('guide_id', guideId)
    .limit(6);

  if (error) throw error;
  return ((data ?? []) as { related_guide: Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'> }[]).map(
    (r) => r.related_guide,
  );
}
