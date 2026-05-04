import type { JSX } from 'react';

export function GuideCardSkeleton(): JSX.Element {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--color-surface3)] animate-pulse">
      <div className="grow min-w-0 space-y-2.5">
        <div className="h-4 w-3/4 rounded-md bg-[var(--color-surface3)]" />
        <div className="flex items-center gap-3">
          <div className="h-3 w-12 rounded bg-[var(--color-surface3)]" />
          <div className="h-3 w-16 rounded bg-[var(--color-surface3)]" />
          <div className="h-3 w-20 rounded bg-[var(--color-surface3)]" />
        </div>
        <div className="h-1.5 w-32 rounded-full bg-[var(--color-surface3)]" />
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <div className="h-3 w-16 rounded bg-[var(--color-surface3)]" />
        <div className="h-6 w-8 rounded bg-[var(--color-surface3)]" />
      </div>
    </div>
  );
}

export function GuideListSkeleton({ count = 5 }: { count?: number }): JSX.Element {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <GuideCardSkeleton key={i} />
      ))}
    </div>
  );
}
