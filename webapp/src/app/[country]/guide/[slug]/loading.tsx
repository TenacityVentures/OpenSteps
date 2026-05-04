import type { JSX } from 'react';

function S({ className }: { className: string }) {
  return <div className={`bg-[var(--color-surface3)] ${className}`} />;
}

export default function GuideLoading(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse space-y-8">

      {/* GuideHeader */}
      <div className="space-y-4">
        {/* Category badge */}
        <S className="h-5 w-20 rounded-full" />
        {/* Title */}
        <S className="h-9 w-5/6 rounded-xl" />
        {/* Description */}
        <S className="h-4 w-full rounded-md" />
        <S className="h-4 w-3/4 rounded-md" />
        {/* Meta chips: steps · duration · cost · verifications */}
        <div className="flex gap-2 flex-wrap">
          <S className="h-7 w-20 rounded-full" />
          <S className="h-7 w-28 rounded-full" />
          <S className="h-7 w-24 rounded-full" />
          <S className="h-7 w-24 rounded-full" />
        </div>
        {/* Trust bar */}
        <S className="h-2 w-full rounded-full" />
      </div>

      {/* Step cards — 3 */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-[var(--color-surface3)] bg-white p-5 space-y-3">
          <div className="flex items-center gap-3">
            <S className="h-7 w-7 rounded-full shrink-0" />
            <S className="h-5 w-2/3 rounded-md" />
          </div>
          <S className="h-3.5 w-full rounded" />
          <S className="h-3.5 w-5/6 rounded" />
          <S className="h-3.5 w-4/6 rounded" />
        </div>
      ))}

      {/* WhatToBring */}
      <div className="space-y-3">
        <S className="h-4 w-36 rounded-md" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[var(--color-surface3)]">
            <S className="h-4 w-4 rounded shrink-0" />
            <S className="h-3.5 w-48 rounded" />
            <S className="h-5 w-14 rounded-full ml-auto" />
          </div>
        ))}
      </div>

      {/* BudgetBreakdown */}
      <div className="space-y-3">
        <S className="h-4 w-32 rounded-md" />
        <div className="rounded-xl border border-[var(--color-surface3)] overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex justify-between px-4 py-3 border-b border-[var(--color-surface3)] last:border-0 bg-white">
              <S className="h-3.5 w-40 rounded" />
              <S className="h-3.5 w-20 rounded" />
            </div>
          ))}
          {/* Total row */}
          <div className="flex justify-between px-4 py-3 bg-[var(--color-surface2)]">
            <S className="h-4 w-12 rounded" />
            <S className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
