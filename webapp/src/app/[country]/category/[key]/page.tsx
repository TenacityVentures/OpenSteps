import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getGuidesByCategory } from '@opensteps/supabase';
import { CATEGORY_MAP } from '@opensteps/constants';
import type { CategoryKey, CountryCode } from '@opensteps/types';
import GuideList from '@/components/home/GuideList';

interface Props {
  params: Promise<{ country: string; key: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const cat = CATEGORY_MAP[key as CategoryKey];
  if (!cat) return {};
  return { title: cat.label };
}

export default async function CategoryPage({ params }: Props): Promise<JSX.Element> {
  const { country, key } = await params;
  const cat = CATEGORY_MAP[key as CategoryKey];
  if (!cat) notFound();

  const client = await createClient();
  const guides = await getGuidesByCategory(client, key as CategoryKey, country as CountryCode);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Category</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">{cat.label}</h1>
        {cat.subtitle && (
          <p className="text-sm text-[var(--color-ink-3)]">{cat.subtitle}</p>
        )}
      </div>

      {guides.length > 0 ? (
        <GuideList guides={guides} />
      ) : (
        <p className="text-sm text-[var(--color-ink-4)] italic">
          No guides published in this category yet.{' '}
          <a href="../contribute" className="text-[var(--color-green)] hover:underline">
            Be the first to contribute →
          </a>
        </p>
      )}
    </div>
  );
}
