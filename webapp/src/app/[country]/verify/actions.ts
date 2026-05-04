'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail, GuidePublishedEmail, VerificationMilestoneEmail } from '@/lib/email';

async function notifyContributor(
  guideId: string,
  emailFn: (args: { email: string; displayName: string; slug: string; country: string; guideTitle: string }) => void,
) {
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
    if (!feed?.actor_id) return;

    const { data: guide } = await admin
      .from('guides')
      .select('slug, country, title')
      .eq('id', guideId)
      .single();
    if (!guide) return;

    const { data: { user } } = await admin.auth.admin.getUserById(feed.actor_id as string);
    if (!user?.email) return;

    const displayName =
      (user.user_metadata?.['display_name'] as string | undefined) ??
      user.email.split('@')[0] ??
      'there';

    emailFn({
      email: user.email,
      displayName,
      slug: guide.slug as string,
      country: guide.country as string,
      guideTitle: guide.title as string,
    });
  } catch {
    // Email failure must never break the action
  }
}

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be signed in.');
  return { supabase, user };
}

async function requireEditor() {
  const { supabase, user } = await requireAuth();
  const { data: verifier } = await supabase
    .from('verifiers')
    .select('role')
    .eq('id', user.id)
    .single();
  if (verifier?.role !== 'editor') throw new Error('Editor role required.');
  return { supabase, user };
}

/** Any signed-in user can verify. Duplicate blocked by PK. Auto-publishes at 5. */
export async function communityVerify(guideId: string, note?: string): Promise<void> {
  const { supabase, user } = await requireAuth();

  const { error } = await supabase.from('guide_verifications').insert({
    guide_id: guideId,
    verifier_id: user.id,
    note: note?.trim() || null,
  });

  // Ignore unique constraint violation (already verified)
  if (error && !error.message.includes('unique') && !error.code?.includes('23505')) {
    throw new Error(error.message);
  }

  // Update verifier stats
  await supabase.rpc('increment_verification_count' as never, { user_id: user.id }).maybeSingle();

  // Check if this was the 5th verification — DB trigger auto-publishes at 5
  const { count } = await supabase
    .from('guide_verifications')
    .select('*', { count: 'exact', head: true })
    .eq('guide_id', guideId);

  if (count === 5) {
    notifyContributor(guideId, ({ email, displayName, slug, country, guideTitle }) => {
      sendEmail({
        to: email,
        subject: 'Your guide just went live on OpenSteps',
        html: VerificationMilestoneEmail({ displayName, guideTitle, country, slug }),
      });
    });
  }
}

/** Editor: immediately publish the guide */
export async function editorApprove(guideId: string): Promise<void> {
  const { user } = await requireEditor();
  const admin = createAdminClient();

  const { error: updateErr } = await admin
    .from('guides')
    .update({
      published: true,
      trust_score: 8.0,
      last_verified_at: new Date().toISOString(),
    })
    .eq('id', guideId);

  if (updateErr) throw new Error(updateErr.message);

  await admin.from('community_feed').insert({
    type: 'verify',
    guide_id: guideId,
    actor_id: user.id,
    description: 'Guide approved and published by editor',
  });

  // Notify contributor
  notifyContributor(guideId, ({ email, displayName, slug, country, guideTitle }) => {
    sendEmail({
      to: email,
      subject: 'Your guide is live on OpenSteps',
      html: GuidePublishedEmail({ displayName, guideTitle, country, slug }),
    });
  });
}

/** Editor: flag a guide as needing revision */
export async function editorFlag(guideId: string, reason: string): Promise<void> {
  const { supabase, user } = await requireEditor();

  const { error } = await supabase.from('community_feed').insert({
    type: 'flag',
    guide_id: guideId,
    actor_id: user.id,
    description: reason.trim() || 'Flagged for revision',
  });

  if (error) throw new Error(error.message);
}

/** Editor: update guide content inline */
export async function updateGuideContent(
  guideId: string,
  changes: {
    title?: string;
    description?: string;
    category?: string;
  },
): Promise<void> {
  await requireEditor();
  const admin = createAdminClient();

  const { error } = await admin
    .from('guides')
    .update({ ...changes, updated_at: new Date().toISOString() })
    .eq('id', guideId);

  if (error) throw new Error(error.message);
}

/** Editor: update a single step's content */
export async function updateStep(
  stepId: string,
  changes: { title?: string; description?: string; cost?: number },
): Promise<void> {
  await requireEditor();
  const admin = createAdminClient();

  const { error } = await admin
    .from('steps')
    .update(changes)
    .eq('id', stepId);

  if (error) throw new Error(error.message);
}

/** Editor: update a document requirement's label or required flag */
export async function updateDocument(
  docId: string,
  changes: { label?: string; required?: boolean },
): Promise<void> {
  await requireEditor();
  const admin = createAdminClient();

  const { error } = await admin
    .from('documents_needed')
    .update(changes)
    .eq('id', docId);

  if (error) throw new Error(error.message);
}

/** Request edit access for a published guide */
export async function requestEdit(guideId: string, reason: string): Promise<void> {
  const { supabase, user } = await requireAuth();

  const { error } = await supabase.from('edit_requests').insert({
    guide_id: guideId,
    requester_id: user.id,
    reason: reason.trim(),
  });

  if (error) throw new Error(error.message);
}

/** Editor: approve an edit request → guide goes back to unpublished */
export async function approveEditRequest(requestId: string): Promise<void> {
  const { user } = await requireEditor();
  const admin = createAdminClient();

  const { data: req, error: reqErr } = await admin
    .from('edit_requests')
    .select('guide_id')
    .eq('id', requestId)
    .single();

  if (reqErr || !req) throw new Error('Edit request not found.');

  await admin.from('edit_requests').update({
    status: 'approved',
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
  }).eq('id', requestId);

  await admin.from('guides').update({ published: false }).eq('id', req.guide_id);
}

/** Editor: reject an edit request */
export async function rejectEditRequest(requestId: string): Promise<void> {
  const { user } = await requireEditor();
  const admin = createAdminClient();

  await admin.from('edit_requests').update({
    status: 'rejected',
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
  }).eq('id', requestId);
}
