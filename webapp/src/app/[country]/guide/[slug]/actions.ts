'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail, NewTipEmail } from '@/lib/email';
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

  const { data: guide } = await supabase
    .from('guides')
    .select('slug, country, title')
    .eq('id', guideId)
    .single();
  if (guide) revalidatePath(`/${guide.country}/guide/${guide.slug}`);

  // Notify guide contributor (skip if they're the one adding the tip)
  if (guide) {
    try {
      const admin = createAdminClient();
      const { data: feed } = await admin
        .from('community_feed')
        .select('actor_id')
        .eq('guide_id', guideId)
        .eq('type', 'contribute')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (feed?.actor_id && feed.actor_id !== user.id) {
        const { data: { user: contributor } } = await admin.auth.admin.getUserById(feed.actor_id as string);
        if (contributor?.email) {
          const authorName =
            (user.user_metadata?.['display_name'] as string | undefined) ??
            user.email?.split('@')[0] ?? 'Someone';
          const authorDisplay =
            (contributor.user_metadata?.['display_name'] as string | undefined) ??
            contributor.email.split('@')[0] ?? 'there';
          await sendEmail({
            to: contributor.email,
            subject: `New tip on "${guide.title as string}"`,
            html: NewTipEmail({
              guideAuthorName: authorDisplay,
              guideTitle: guide.title as string,
              country: guide.country as string,
              slug: guide.slug as string,
              tipText: text.trim(),
              tipAuthorName: authorName,
            }),
          });
        }
      }
    } catch {
      // Email failure must not break tip submission
    }
  }

  return data as Tip;
}

async function syncUpvoteCount(supabase: Awaited<ReturnType<typeof createClient>>, tipId: string) {
  const { count } = await supabase
    .from('tip_upvotes')
    .select('*', { count: 'exact', head: true })
    .eq('tip_id', tipId);
  await supabase.from('tips').update({ upvotes: count ?? 0 }).eq('id', tipId);
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

  await syncUpvoteCount(supabase, tipId);
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

  await syncUpvoteCount(supabase, tipId);
  await revalidateGuideForTip(supabase, tipId);
}
