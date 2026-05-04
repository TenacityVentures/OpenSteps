import type { JSX } from 'react';

function S({ className }: { className: string }) {
  return <div className={`bg-[var(--color-surface3)] ${className}`} />;
}

export default function VerifyLoading(): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6 animate-pulse">

        {/* Page header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <S className="h-8 w-44 rounded-lg" />
            <S className="h-5 w-16 rounded-full" />
          </div>
          <S className="h-4 w-80 rounded" />
        </div>

        {/* SwipeStack card */}
        <div className="rounded-2xl border border-[var(--color-surface3)] bg-white p-6 space-y-5 shadow-sm">
          {/* Category + title */}
          <div className="space-y-3">
            <S className="h-5 w-20 rounded-full" />
            <S className="h-7 w-3/4 rounded-lg" />
            <S className="h-4 w-full rounded" />
            <S className="h-4 w-5/6 rounded" />
          </div>
          {/* Meta chips */}
          <div className="flex gap-2 flex-wrap">
            <S className="h-7 w-20 rounded-full" />
            <S className="h-7 w-24 rounded-full" />
            <S className="h-7 w-20 rounded-full" />
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <S className="flex-1 h-11 rounded-xl" />
            <S className="flex-1 h-11 rounded-xl" />
          </div>
        </div>

        {/* PendingList — table */}
        <div className="space-y-2">
          <S className="h-3 w-32 rounded" />
          <div className="rounded-xl border border-[var(--color-surface3)] overflow-hidden">
            {/* Table header */}
            <div className="flex gap-6 px-4 py-2.5 bg-[var(--color-surface2)] border-b border-[var(--color-surface3)]">
              <S className="h-3 w-1/3 rounded" />
              <S className="h-3 w-16 rounded" />
              <S className="h-3 w-8 rounded" />
              <S className="h-3 w-16 rounded" />
              <S className="h-3 w-14 rounded ml-auto" />
            </div>
            {/* Rows */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6 items-center px-4 py-3 border-b border-[var(--color-surface3)] last:border-0 bg-white">
                <S className="h-3.5 w-1/3 rounded" />
                <S className="h-3 w-16 rounded" />
                <S className="h-3 w-6 rounded" />
                <S className="h-3 w-16 rounded" />
                <S className="h-3 w-14 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
