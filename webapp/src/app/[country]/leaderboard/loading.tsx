import type { JSX } from 'react';

function S({ className }: { className: string }) {
  return <div className={`bg-[var(--color-surface3)] ${className}`} />;
}

function ContributorRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-surface3)] last:border-0 bg-white">
      <S className="h-3 w-5 rounded shrink-0" />
      <S className="h-7 w-7 rounded-full shrink-0" />
      <div className="flex-1 min-w-0 space-y-1.5">
        <S className="h-3.5 w-28 rounded" />
        <S className="h-2.5 w-20 rounded" />
      </div>
      <S className="h-3 w-8 rounded shrink-0" />
    </div>
  );
}

function GuideRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-surface3)] last:border-0 bg-white">
      <S className="h-3 w-5 rounded shrink-0" />
      <div className="flex-1 min-w-0 space-y-1.5">
        <S className="h-3.5 w-48 rounded" />
        <S className="h-2.5 w-24 rounded" />
      </div>
      <div className="flex items-center gap-2 w-32 shrink-0">
        <S className="flex-1 h-1.5 rounded-full" />
        <S className="h-3 w-8 rounded" />
      </div>
    </div>
  );
}

export default function LeaderboardLoading(): JSX.Element {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 animate-pulse space-y-12">

      {/* Page header + toggle */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <S className="h-3 w-20 rounded" />
          <S className="h-9 w-40 rounded-lg" />
          <S className="h-4 w-56 rounded" />
        </div>
        <S className="h-8 w-20 rounded-lg shrink-0 mt-1" />
      </div>

      {/* StatsBlock — 4 tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--color-surface3)] bg-white p-4 space-y-2">
            <S className="h-8 w-14 rounded" />
            <S className="h-3 w-24 rounded" />
          </div>
        ))}
      </div>

      {/* Top contributors — podium + list */}
      <section className="space-y-4">
        <S className="h-3 w-32 rounded" />
        {/* Podium */}
        <div className="flex items-end justify-center gap-6 py-4">
          {/* 2nd place */}
          <div className="flex flex-col items-center gap-2 pt-4 w-20">
            <S className="h-5 w-5 rounded" />
            <S className="h-9 w-9 rounded-full" />
            <S className="h-3 w-16 rounded" />
            <S className="h-10 w-full rounded-t-lg" />
          </div>
          {/* 1st place */}
          <div className="flex flex-col items-center gap-2 w-24">
            <S className="h-5 w-5 rounded" />
            <S className="h-14 w-14 rounded-full" />
            <S className="h-3.5 w-20 rounded" />
            <S className="h-16 w-full rounded-t-lg" />
          </div>
          {/* 3rd place */}
          <div className="flex flex-col items-center gap-2 pt-8 w-20">
            <S className="h-5 w-5 rounded" />
            <S className="h-9 w-9 rounded-full" />
            <S className="h-3 w-14 rounded" />
            <S className="h-6 w-full rounded-t-lg" />
          </div>
        </div>
        {/* Contributor rows 4–8 */}
        <div className="rounded-xl border border-[var(--color-surface3)] overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => <ContributorRow key={i} />)}
        </div>
      </section>

      {/* Most trusted guides */}
      <section className="space-y-3">
        <S className="h-3 w-40 rounded" />
        <div className="rounded-xl border border-[var(--color-surface3)] overflow-hidden">
          {[0, 1, 2].map((i) => <GuideRow key={i} />)}
        </div>
      </section>

      {/* Top tippers */}
      <section className="space-y-3">
        <S className="h-3 w-24 rounded" />
        <div className="rounded-xl border border-[var(--color-surface3)] overflow-hidden">
          {[0, 1, 2].map((i) => <ContributorRow key={i} />)}
        </div>
      </section>

    </div>
  );
}
