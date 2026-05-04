import type { JSX } from 'react';
import { GuideListSkeleton } from '@/components/ui/GuideCardSkeleton';

export default function CountryLoading(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Hero skeleton */}
      <div className="animate-pulse space-y-3">
        <div className="h-8 w-2/3 rounded-lg bg-[var(--color-surface3)]" />
        <div className="h-4 w-1/2 rounded bg-[var(--color-surface3)]" />
        <div className="h-10 w-full rounded-lg bg-[var(--color-surface3)]" />
      </div>
      <GuideListSkeleton count={6} />
    </div>
  );
}
