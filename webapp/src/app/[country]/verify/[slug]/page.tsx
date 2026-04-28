import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getPendingGuideBySlug, getStepsByGuide, getDocumentsByGuide, getBudgetLines } from '@opensteps/supabase';
import { ReviewPanel } from '@/components/verify/ReviewPanel';

interface Props {
  params: Promise<{ country: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Review: ${slug} — OpenSteps` };
}

export const revalidate = 0;

export default async function VerifyDetailPage({ params }: Props): Promise<JSX.Element> {
  const { country, slug } = await params;
  const supabase = await createClient();

  const guide = await getPendingGuideBySlug(supabase, slug);
  if (!guide) notFound();

  const [steps, documents, budgetLines] = await Promise.all([
    getStepsByGuide(supabase, guide.id),
    getDocumentsByGuide(supabase, guide.id),
    getBudgetLines(supabase, guide.id),
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <ReviewPanel
          guide={guide}
          steps={steps}
          documents={documents}
          budgetLines={budgetLines}
          country={country}
        />
      </div>
    </main>
  );
}
