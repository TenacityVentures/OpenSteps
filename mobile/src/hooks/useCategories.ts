import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getCategories } from '@opensteps/supabase';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(supabase),
    // Categories change rarely — cache for 24 hours
    staleTime: 1000 * 60 * 60 * 24,
  });
}
