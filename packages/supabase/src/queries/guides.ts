import type { SupabaseClient } from '@supabase/supabase-js';
import type { Guide, CategoryKey, CountryCode } from '@opensteps/types';

export interface GetGuidesParams {
  country?: CountryCode;
  category?: CategoryKey;
  limit?: number;
  orderBy?: 'follower_count' | 'trust_score' | 'last_verified_at';
}

/** Fetch published guides for listing (home, category browse) */
export async function getGuides(
  client: SupabaseClient,
  { country, category, limit = 20, orderBy = 'follower_count' }: GetGuidesParams = {},
): Promise<Guide[]> {
  let query = client
    .from('guides')
    .select('*')
    .eq('published', true)
    .order(orderBy, { ascending: false })
    .limit(limit);

  if (country) query = query.eq('country', country);
  if (category) query = query.eq('category', category);

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
  country?: CountryCode,
  limit = 40,
): Promise<Guide[]> {
  return getGuides(client, { ...(country ? { country } : {}), category, limit, orderBy: 'trust_score' });
}

/** Unpublished guides waiting for editorial review */
export async function getPendingGuides(
  client: SupabaseClient,
  limit = 20,
): Promise<Pick<Guide, 'id' | 'slug' | 'title' | 'category' | 'description' | 'steps_count' | 'total_cost' | 'duration_days' | 'created_at'>[]> {
  const { data, error } = await client
    .from('guides')
    .select('id, slug, title, category, description, steps_count, total_cost, duration_days, created_at')
    .eq('published', false)
    .order('created_at', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Pick<Guide, 'id' | 'slug' | 'title' | 'category' | 'description' | 'steps_count' | 'total_cost' | 'duration_days' | 'created_at'>[];
}

/** Single unpublished guide by slug (for the review detail page) */
export async function getPendingGuideBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<Guide | null> {
  const { data, error } = await client
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('published', false)
    .single();
  if (error) return null;
  return data as Guide;
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
  return ((data ?? []) as unknown as { related_guide: Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'> }[]).map(
    (r) => r.related_guide,
  );
}
