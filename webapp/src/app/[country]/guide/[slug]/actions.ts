'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { Tip } from '@opensteps/types';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be signed in.');
  return { supabase, user };
}

async function revalidateGuideForTip(supabase: Awaited<ReturnType<typeof createClient>>, tipId: string) {
  const { data: tip } = await supabase.from('tips').select('guide_id').eq('id', tipId).single();
  if (!tip) return;
  const { data: guide } = await supabase.from('guides').select('slug, country').eq('id', tip.guide_id).single();
  if (guide) revalidatePath(`/${guide.country}/guide/${guide.slug}`);
}

export async function addTip(guideId: string, text: string, stepId?: string): Promise<Tip> {
  const { supabase, user } = await requireAuth();

  const { data, error } = await supabase
    .from('tips')
    .insert({
      guide_id: guideId,
      step_id: stepId ?? null,
      author_id: user.id,
      text: text.trim(),
      upvotes: 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { data: guide } = await supabase.from('guides').select('slug, country').eq('id', guideId).single();
  if (guide) revalidatePath(`/${guide.country}/guide/${guide.slug}`);

  return data as Tip;
}

export async function upvoteTip(tipId: string): Promise<void> {
  const { supabase, user } = await requireAuth();

  const { error } = await supabase.from('tip_upvotes').insert({
    tip_id: tipId,
    user_id: user.id,
  });

  // Ignore duplicate (already upvoted)
  if (error && !error.code?.includes('23505') && !error.message.includes('unique')) {
    throw new Error(error.message);
  }

  await revalidateGuideForTip(supabase, tipId);
}

export async function removeUpvote(tipId: string): Promise<void> {
  const { supabase, user } = await requireAuth();

  const { error } = await supabase
    .from('tip_upvotes')
    .delete()
    .eq('tip_id', tipId)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  await revalidateGuideForTip(supabase, tipId);
}
