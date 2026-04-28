import type { JSX } from 'react';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { searchGuides } from '@opensteps/supabase';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';
import GuideList from '@/components/home/GuideList';
import { SearchInput } from '@/components/search/SearchInput';

const S = Suspense as unknown as (props: { children: React.ReactNode; fallback?: React.ReactNode }) => JSX.Element;

export function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Metadata {
  return { title: 'Search — OpenSteps' };
}

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props): Promise<JSX.Element> {
  const { q = '' } = await searchParams;
  const client = await createClient();

  const guides = q.trim().length > 1 ? await searchGuides(client, q.trim()) : [];

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Search</h1>
        <S fallback={null}>
          <SearchInput />
        </S>
      </div>

      {q.trim().length > 1 ? (
        <>
          <p className="text-sm text-[var(--color-ink-3)]">
            {guides.length === 0
              ? `No guides match "${q}".`
              : `${guides.length} guide${guides.length !== 1 ? 's' : ''} for "${q}"`}
          </p>
          {guides.length > 0 ? (
            <GuideList guides={guides} />
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-[var(--color-ink-3)]">
                Try a different search, or browse by category.
              </p>
              <a
                href={`/${ACTIVE_COUNTRY_CODES[0] ?? 'sl'}`}
                className="inline-block text-sm text-[var(--color-green)] hover:underline"
              >
                Browse all guides →
              </a>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-[var(--color-ink-4)] italic">
          Type at least 2 characters to search.
        </p>
      )}
    </div>
  );
}
