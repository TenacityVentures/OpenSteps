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
  return ((data ?? []) as unknown as { verifier: Verifier }[]).map((r) => r.verifier);
}

/** IDs of tips the user has already upvoted for a guide */
export async function getUserTipUpvotes(
  client: SupabaseClient,
  userId: string,
  guideId: string,
): Promise<string[]> {
  const { data, error } = await client
    .from('tip_upvotes')
    .select('tip_id')
    .eq('user_id', userId)
    .in('tip_id', (
      await client.from('tips').select('id').eq('guide_id', guideId)
    ).data?.map((t: { id: string }) => t.id) ?? []);

  if (error) return [];
  return (data ?? []).map((r: { tip_id: string }) => r.tip_id);
}

/** Verification count for a guide */
export async function getVerificationCount(
  client: SupabaseClient,
  guideId: string,
): Promise<number> {
  const { count, error } = await client
    .from('guide_verifications')
    .select('*', { count: 'exact', head: true })
    .eq('guide_id', guideId);

  if (error) return 0;
  return count ?? 0;
}

/** Check if the current user has already verified a guide */
export async function hasUserVerified(
  client: SupabaseClient,
  guideId: string,
  userId: string,
): Promise<boolean> {
  const { count, error } = await client
    .from('guide_verifications')
    .select('*', { count: 'exact', head: true })
    .eq('guide_id', guideId)
    .eq('verifier_id', userId);

  if (error) return false;
  return (count ?? 0) > 0;
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
