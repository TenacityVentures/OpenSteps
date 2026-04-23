import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tip, Verifier, FeedItem } from '@opensteps/types';

/** Recent community feed events */
export async function getFeed(
  client: SupabaseClient,
  limit = 20,
): Promise<FeedItem[]> {
  const { data, error } = await client
    .from('community_feed')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as FeedItem[];
}

/** Tips for a guide, sorted by upvotes */
export async function getTipsByGuide(
  client: SupabaseClient,
  guideId: string,
): Promise<Tip[]> {
  const { data, error } = await client
    .from('tips')
    .select('*')
    .eq('guide_id', guideId)
    .order('upvotes', { ascending: false })
    .limit(10);

  if (error) throw error;
  return (data ?? []) as Tip[];
}

/** Verifiers who have verified a guide */
export async function getVerifiersByGuide(
  client: SupabaseClient,
  guideId: string,
): Promise<Verifier[]> {
  const { data, error } = await client
    .from('guide_verifications')
    .select('verifier:verifiers(*)')
    .eq('guide_id', guideId)
    .limit(10);

  if (error) throw error;
  return ((data ?? []) as { verifier: Verifier }[]).map((r) => r.verifier);
}

/** Top contributors / leaderboard */
export async function getTopVerifiers(
  client: SupabaseClient,
  limit = 10,
): Promise<Verifier[]> {
  const { data, error } = await client
    .from('verifiers')
    .select('*')
    .order('verification_count', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Verifier[];
}
