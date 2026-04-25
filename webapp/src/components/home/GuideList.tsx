import type { Guide } from '@opensteps/types';
import GuideCard from './GuideCard';

export default function GuideList({ guides }: { guides: Guide[] }) {
  if (guides.length === 0) {
    return (
      <p className="text-[var(--color-ink-3)] text-sm py-4">
        No guides yet — check back soon.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      {guides.map((g) => (
        <GuideCard key={g.id} guide={g} />
      ))}
    </div>
  );
}
