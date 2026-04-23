import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getFeed } from '@opensteps/supabase';

export function useFeed(limit = 15) {
  return useQuery({
    queryKey: ['feed', limit],
    queryFn: () => getFeed(supabase, limit),
    // Feed is more time-sensitive — refresh every 5 minutes
    staleTime: 1000 * 60 * 5,
  });
}
