import type { SupabaseClient } from '@supabase/supabase-js';
import type { Step, DocumentNeeded, BudgetLine } from '@opensteps/types';

/** All steps for a guide, ordered by n */
export async function getStepsByGuide(
  client: SupabaseClient,
  guideId: string,
): Promise<Step[]> {
  const { data, error } = await client
    .from('steps')
    .select('*')
    .eq('guide_id', guideId)
    .order('n', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Step[];
}

/** Documents needed for a guide (pre-flight checklist) */
export async function getDocumentsByGuide(
  client: SupabaseClient,
  guideId: string,
): Promise<DocumentNeeded[]> {
  const { data, error } = await client
    .from('documents_needed')
    .select('*')
    .eq('guide_id', guideId);

  if (error) throw error;
  return (data ?? []) as DocumentNeeded[];
}

/** Budget line items for a guide */
export async function getBudgetLines(
  client: SupabaseClient,
  guideId: string,
): Promise<BudgetLine[]> {
  const { data, error } = await client
    .from('budget_lines')
    .select('*')
    .eq('guide_id', guideId);

  if (error) throw error;
  return (data ?? []) as BudgetLine[];
}
