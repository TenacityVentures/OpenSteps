import type { JSX } from 'react';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { searchGuides } from '@opensteps/supabase';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';
import GuideList from '@/components/home/GuideList';
import { SearchInput } from '@/components/search/SearchInput';

const S = Suspense as unknown as (props: { children: React.ReactNode; fallback?: React.ReactNode }) => JSX.Element;

export function generateMetadata(): Metadata {
  return { title: 'Search — OpenSteps' };
}

interface Props {
  searchParams: Promise<{ q?: string }>;
}

const SUGGESTED_TERMS = ["passport", "business registration", "driver's licence", "income tax"];

export default async function SearchPage({ searchParams }: Props): Promise<JSX.Element> {
  const { q = '' } = await searchParams;
  const client = await createClient();

  const guides = q.trim().length > 1 ? await searchGuides(client, q.trim()) : [];

  const country = ACTIVE_COUNTRY_CODES[0] ?? 'sl';

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
              : `${guides.length} guide${guides.length !== 1 ? 's' : ''} found for "${q}"`}
          </p>
          {guides.length > 0 ? (
            <GuideList guides={guides} />
          ) : (
            <div className="text-center py-16 border border-dashed border-[var(--color-surface3)] rounded-2xl space-y-3">
              <p className="text-[var(--color-ink-4)]">No results found.</p>
              <p className="text-sm text-[var(--color-ink-3)]">Try fewer words or a different term.</p>
              <a
                href={`/${country}`}
                className="inline-block text-sm text-[var(--color-green)] hover:underline font-medium"
              >
                Browse all guides →
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-[var(--color-ink-4)]">
            Start typing to search across all published guides.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {SUGGESTED_TERMS.map((term) => (
              <a
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-2 text-xs text-[var(--color-ink-3)] bg-white border border-[var(--color-surface3)] rounded-lg hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors text-center"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
