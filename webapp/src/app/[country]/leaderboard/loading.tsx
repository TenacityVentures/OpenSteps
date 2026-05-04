import type { JSX } from 'react';
import { Spinner } from '@/components/ui/Spinner';

export default function LeaderboardLoading(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-[var(--color-green)]">
      <Spinner size={36} />
    </div>
  );
}
