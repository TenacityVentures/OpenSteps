import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getGuidesByCategory } from '@opensteps/supabase';
import { CATEGORY_MAP } from '@opensteps/constants';
import type { CategoryKey, CountryCode } from '@opensteps/types';
import GuideList from '@/components/home/GuideList';

export const revalidate = 60;

interface Props {
  params: Promise<{ country: string; key: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const cat = CATEGORY_MAP[key as CategoryKey];
  if (!cat) return {};
  return { title: `${cat.label} — OpenSteps` };
}

export default async function CategoryPage({ params }: Props): Promise<JSX.Element> {
  const { country, key } = await params;
  const cat = CATEGORY_MAP[key as CategoryKey];
  if (!cat) notFound();

  const client = await createClient();
  const guides = await getGuidesByCategory(client, key as CategoryKey, country as CountryCode, 40);

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[var(--color-ink-4)]">
        <Link href={`/${country}`} className="hover:text-[var(--color-green)] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink-3)]">{cat.label}</span>
      </nav>

      {/* Header with icon */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-green-tint)] border border-[var(--color-green-soft)] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-[var(--color-green)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={cat.iconPaths} />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink)]">{cat.label}</h1>
          <p className="text-sm text-[var(--color-ink-3)]">{cat.subtitle}</p>
        </div>
      </div>

      {/* Count line */}
      <p className="text-sm text-[var(--color-ink-3)]">
        {guides.length === 0
          ? 'No published guides in this category yet.'
          : `${guides.length} guide${guides.length !== 1 ? 's' : ''}`}
      </p>

      {guides.length > 0 ? (
        <GuideList guides={guides} />
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--color-surface3)] rounded-2xl space-y-3">
          <p className="text-sm text-[var(--color-ink-4)]">Be the first to contribute a guide in this category.</p>
          <Link
            href={`/${country}/contribute`}
            className="inline-block text-sm text-[var(--color-green)] hover:underline font-medium"
          >
            Contribute a guide →
          </Link>
        </div>
      )}
    </div>
  );
}
