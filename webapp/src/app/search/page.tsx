import { createClient } from '@/lib/supabase/server';
import { searchGuides } from '@opensteps/supabase';
import GuideList from '@/components/home/GuideList';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const client = await createClient();

  const guides = q.trim().length > 1 ? await searchGuides(client, q.trim()) : [];

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {q ? `Results for "${q}"` : 'Search guides'}
        </h1>
        {q && (
          <p className="text-sm text-[--color-ink-3] mt-1">
            {guides.length} guide{guides.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
      {guides.length > 0 ? (
        <GuideList guides={guides} />
      ) : q ? (
        <p className="text-[--color-ink-3]">
          No guides match &ldquo;{q}&rdquo;. Try a different term or{' '}
          <a href="/sl" className="text-[--color-green] underline">
            browse by category
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
