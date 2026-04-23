import { useQueries } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import {
  getStepsByGuide,
  getDocumentsByGuide,
  getBudgetLines,
  getEvidenceByGuide,
  getTipsByGuide,
  getVerifiersByGuide,
} from '@opensteps/supabase';

/** Fetches all data needed for the guide detail screen in parallel */
export function useGuideDetail(guideId: string | undefined) {
  const enabled = !!guideId;
  const id = guideId ?? '';

  const results = useQueries({
    queries: [
      {
        queryKey: ['steps', id],
        queryFn: () => getStepsByGuide(supabase, id),
        enabled,
      },
      {
        queryKey: ['documents', id],
        queryFn: () => getDocumentsByGuide(supabase, id),
        enabled,
      },
      {
        queryKey: ['budget', id],
        queryFn: () => getBudgetLines(supabase, id),
        enabled,
      },
      {
        queryKey: ['evidence', id],
        queryFn: () => getEvidenceByGuide(supabase, id),
        enabled,
      },
      {
        queryKey: ['tips', id],
        queryFn: () => getTipsByGuide(supabase, id),
        enabled,
      },
      {
        queryKey: ['verifiers', id],
        queryFn: () => getVerifiersByGuide(supabase, id),
        enabled,
      },
    ],
  });

  return {
    steps:     results[0]?.data ?? [],
    documents: results[1]?.data ?? [],
    budget:    results[2]?.data ?? [],
    evidence:  results[3]?.data ?? [],
    tips:      results[4]?.data ?? [],
    verifiers: results[5]?.data ?? [],
    isLoading: results.some((r) => r.isLoading),
    isError:   results.some((r) => r.isError),
  };
}
