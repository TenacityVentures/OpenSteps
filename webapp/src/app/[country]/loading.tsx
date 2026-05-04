import type { JSX } from 'react';

function S({ className }: { className: string }) {
  return <div className={`bg-[var(--color-surface3)] ${className}`} />;
}

export default function CountryLoading(): JSX.Element {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-pulse">

      {/* SearchHero */}
      <section className="text-center py-8 space-y-4">
        <S className="h-10 w-3/4 mx-auto rounded-xl" />
        <S className="h-4 w-1/2 mx-auto rounded-md" />
        <div className="max-w-lg mx-auto flex gap-2">
          <S className="flex-1 h-12 rounded-xl" />
          <S className="w-24 h-12 rounded-xl" />
        </div>
      </section>

      {/* TrustStats — 3 stat tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--color-surface3)] bg-white p-4 space-y-2">
            <S className="h-8 w-14 rounded-lg" />
            <S className="h-3 w-20 rounded" />
          </div>
        ))}
      </div>

      {/* Category grid */}
      <section className="space-y-4">
        <S className="h-3 w-28 rounded" />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[var(--color-surface3)] bg-white p-3 space-y-2.5">
              <S className="h-8 w-8 rounded-lg" />
              <S className="h-3 w-full rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Guide list + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <section className="space-y-3">
          <S className="h-3 w-24 rounded" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--color-surface3)]">
              <div className="grow min-w-0 space-y-2.5">
                <S className="h-4 w-3/4 rounded-md" />
                <div className="flex gap-3">
                  <S className="h-3 w-12 rounded" />
                  <S className="h-3 w-16 rounded" />
                  <S className="h-3 w-20 rounded" />
                </div>
                <S className="h-1.5 w-32 rounded-full" />
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2">
                <S className="h-3 w-16 rounded" />
                <S className="h-6 w-8 rounded" />
              </div>
            </div>
          ))}
        </section>

        <aside className="space-y-6">
          {/* LiveFeedRail */}
          <div className="rounded-xl border border-[var(--color-surface3)] bg-white p-4 space-y-3">
            <S className="h-3 w-20 rounded" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <S className="h-5 w-5 rounded-full shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <S className="h-3 w-full rounded" />
                  <S className="h-2.5 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* TopContributors */}
          <div className="rounded-xl border border-[var(--color-surface3)] bg-white p-4 space-y-3">
            <S className="h-3 w-32 rounded" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <S className="h-7 w-7 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <S className="h-3 w-24 rounded" />
                  <S className="h-2.5 w-16 rounded" />
                </div>
                <S className="h-3 w-8 rounded" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
