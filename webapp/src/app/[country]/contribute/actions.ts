'use server';

import { createClient } from '@/lib/supabase/server';
import type { GuideDraft } from '@/components/contribute/types';
import { sendEmail, GuideSubmittedEmail } from '@/lib/email';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

function parseDuration(text: string): [number, number] | null {
  const nums = text.match(/\d+/g);
  if (!nums || nums.length === 0) return null;
  const a = parseInt(nums[0]!);
  const b = nums.length > 1 ? parseInt(nums[1] ?? '0') : a;
  return [Math.min(a, b), Math.max(a, b)];
}

export async function submitGuide(draft: GuideDraft): Promise<{ slug: string }> {
  const client = await createClient();

  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('You must be signed in to submit a guide.');

  const baseSlug = toSlug(draft.title.trim()) || 'guide';
  const slug = `${baseSlug}-${Date.now()}`;

  const total_cost = draft.budget_lines.reduce(
    (sum, l) => sum + (parseInt(l.amount) || 0),
    0,
  );

  const { data: guide, error: guideErr } = await client
    .from('guides')
    .insert({
      title: draft.title.trim(),
      slug,
      category: draft.category || 'business',
      country: draft.country || 'sl',
      description: draft.description.trim() || null,
      steps_count: draft.steps.length,
      total_cost,
      duration_days: parseDuration(draft.estimated_time),
      trust_score: 0,
      language: ['en'],
      follower_count: 0,
      published: false,
    })
    .select('id, slug')
    .single();

  if (guideErr) throw new Error(guideErr.message);
  const guideId = guide.id as string;

  if (draft.steps.length > 0) {
    const { error } = await client.from('steps').insert(
      draft.steps.map((s, i) => ({
        guide_id: guideId,
        n: i + 1,
        title: s.title.trim(),
        description: s.description.trim() || null,
        cost: parseInt(s.cost) || 0,
        office: s.office.trim() || null,
        day: parseInt(s.day) || null,
        evidence_count: 0,
      })),
    );
    if (error) throw new Error(error.message);
  }

  const validDocs = draft.documents.filter((d) => d.label.trim());
  if (validDocs.length > 0) {
    const { error } = await client.from('documents_needed').insert(
      validDocs.map((d) => ({
        guide_id: guideId,
        step_id: null,
        label: d.label.trim(),
        required: d.required,
      })),
    );
    if (error) throw new Error(error.message);
  }

  const validLines = draft.budget_lines.filter((l) => l.label.trim());
  if (validLines.length > 0) {
    const { error } = await client.from('budget_lines').insert(
      validLines.map((l) => ({
        guide_id: guideId,
        step_id: null,
        label: l.label.trim(),
        amount: parseInt(l.amount) || 0,
        office: l.office.trim() || null,
        payment_type: l.payment_type,
      })),
    );
    if (error) throw new Error(error.message);
  }

  // Log to community feed
  await client.from('community_feed').insert({
    type: 'contribute',
    guide_id: guideId,
    actor_id: user.id,
    description: `${user.user_metadata?.display_name ?? 'Someone'} submitted a new guide: ${draft.title.trim()}`,
  });

  // Confirmation email — non-blocking, failure never surfaces to user
  if (user.email) {
    const displayName = (user.user_metadata?.display_name as string | undefined) ?? user.email.split('@')[0] ?? 'there';
    await sendEmail({
      to: user.email,
      subject: `Your guide "${draft.title.trim()}" is in review`,
      html: GuideSubmittedEmail({
        displayName,
        guideTitle: draft.title.trim(),
        country: draft.country || 'sl',
      }),
    });
  }

  return { slug: guide.slug as string };
}
