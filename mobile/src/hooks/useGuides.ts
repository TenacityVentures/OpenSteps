import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getGuides, getGuideBySlug, getGuidesByCategory } from '@opensteps/supabase';
import type { CategoryKey } from '@opensteps/types';

export function useGuides(params?: { category?: CategoryKey; limit?: number }) {
  return useQuery({
    queryKey: ['guides', params],
    queryFn: () => getGuides(supabase, params),
  });
}

export function useGuide(slug: string) {
  return useQuery({
    queryKey: ['guide', slug],
    queryFn: () => getGuideBySlug(supabase, slug),
    enabled: !!slug,
  });
}

export function useGuidesByCategory(category: CategoryKey) {
  return useQuery({
    queryKey: ['guides', 'category', category],
    queryFn: () => getGuidesByCategory(supabase, category),
    enabled: !!category,
  });
}
