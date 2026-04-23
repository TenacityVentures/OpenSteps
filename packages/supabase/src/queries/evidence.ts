import type { SupabaseClient } from '@supabase/supabase-js';
import type { Evidence } from '@opensteps/types';

/** All published evidence for a guide */
export async function getEvidenceByGuide(
  client: SupabaseClient,
  guideId: string,
): Promise<Evidence[]> {
  const { data, error } = await client
    .from('evidence')
    .select('*')
    .eq('guide_id', guideId)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Evidence[];
}

/** Published evidence for a specific step */
export async function getEvidenceByStep(
  client: SupabaseClient,
  stepId: string,
): Promise<Evidence[]> {
  const { data, error } = await client
    .from('evidence')
    .select('*')
    .eq('step_id', stepId)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Evidence[];
}

/**
 * Build a Supabase CDN image URL with on-the-fly transforms.
 * Used for evidence thumbnails on slow connections (~15KB each).
 */
export function evidenceThumbnailUrl(
  supabaseUrl: string,
  redactedPath: string,
  opts: { width?: number; quality?: number } = {},
): string {
  const { width = 200, quality = 60 } = opts;
  return `${supabaseUrl}/storage/v1/render/image/public/evidence-redacted/${redactedPath}?width=${width}&quality=${quality}`;
}

/** Full-resolution CDN URL */
export function evidenceFullUrl(supabaseUrl: string, redactedPath: string): string {
  return `${supabaseUrl}/storage/v1/object/public/evidence-redacted/${redactedPath}`;
}
