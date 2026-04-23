import type { SupabaseClient } from '@supabase/supabase-js';
import type { Category } from '@opensteps/types';

/** All categories with live guide counts */
export async function getCategories(client: SupabaseClient): Promise<Category[]> {
  const { data, error } = await client
    .from('categories')
    .select('*')
    .order('count', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Category[];
}
