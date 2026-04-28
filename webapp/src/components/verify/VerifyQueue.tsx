'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import type { Guide } from '@opensteps/types';
import { SwipeStack } from './SwipeStack';
import { PendingList } from './PendingList';

type PendingGuide = Pick<Guide, 'id' | 'slug' | 'title' | 'category' | 'description' | 'steps_count' | 'total_cost' | 'duration_days' | 'created_at'>;

interface Props {
  guides: PendingGuide[];
  country: string;
}

export function VerifyQueue({ guides, country }: Props): JSX.Element {
  const [cardIndex, setCardIndex] = useState(0);
  const remaining = guides.slice(cardIndex);

  return (
    <div className="space-y-10">
      <section>
        <SwipeStack
          guides={guides}
          cardIndex={cardIndex}
          onAdvance={() => setCardIndex((i) => i + 1)}
          country={country}
        />
      </section>

      {remaining.length > 0 && (
        <section>
          <PendingList guides={remaining} country={country} />
        </section>
      )}
    </div>
  );
}
