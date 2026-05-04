import type { JSX } from 'react';

function Block({ w, h }: { w: string; h: string }) {
  return <div className={`${h} ${w} rounded-lg bg-[var(--color-surface3)]`} />;
}

export default function GuideLoading(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Block w="w-16" h="h-5" />
        <Block w="w-3/4" h="h-8" />
        <Block w="w-1/2" h="h-4" />
        <div className="flex gap-3">
          <Block w="w-20" h="h-6" />
          <Block w="w-20" h="h-6" />
          <Block w="w-24" h="h-6" />
        </div>
      </div>

      {/* Trust bar */}
      <Block w="w-full" h="h-2" />

      {/* Steps */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--color-surface3)] bg-white p-5 space-y-2">
            <Block w="w-8" h="h-3" />
            <Block w="w-2/3" h="h-5" />
            <Block w="w-full" h="h-4" />
            <Block w="w-5/6" h="h-4" />
          </div>
        ))}
      </div>

      {/* Docs */}
      <div className="space-y-2">
        <Block w="w-32" h="h-5" />
        <Block w="w-full" h="h-12" />
        <Block w="w-full" h="h-12" />
      </div>
    </div>
  );
}
