import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import {
  getGuideBySlug,
  getStepsByGuide,
  getDocumentsByGuide,
  getBudgetLines,
  getEvidenceByGuide,
  getTipsByGuide,
  getVerifiersByGuide,
  getRelatedGuides,
} from '@opensteps/supabase';
import { formatLeone, formatDuration, formatDate } from '@/lib/format';
import GuideHeader from '@/components/guide/GuideHeader';
import GuideTOC from '@/components/guide/GuideTOC';
import GuideTrustPanel from '@/components/guide/GuideTrustPanel';
import StepList from '@/components/guide/StepList';
import WhatToBring from '@/components/guide/WhatToBring';
import BudgetBreakdown from '@/components/guide/BudgetBreakdown';
import CommunityTips from '@/components/guide/CommunityTips';
import EvidenceThumbs from '@/components/guide/EvidenceThumbs';
import RelatedGuides from '@/components/guide/RelatedGuides';

export const revalidate = 300; // 5-minute ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await createClient();
  const guide = await getGuideBySlug(client, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description ?? undefined,
    openGraph: {
      title: `${guide.title} — OpenSteps`,
      description:
        guide.description ??
        `${guide.steps_count} steps · ${formatLeone(guide.total_cost)} · ${formatDuration(guide.duration_days)}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const client = await createClient();

  const guide = await getGuideBySlug(client, slug);
  if (!guide) notFound();

  const [steps, documents, budget, evidence, tips, verifiers, related] =
    await Promise.all([
      getStepsByGuide(client, guide.id),
      getDocumentsByGuide(client, guide.id),
      getBudgetLines(client, guide.id),
      getEvidenceByGuide(client, guide.id),
      getTipsByGuide(client, guide.id),
      getVerifiersByGuide(client, guide.id),
      getRelatedGuides(client, guide.id),
    ]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GuideHeader guide={guide} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[200px_1fr_300px] gap-8 items-start">
        {/* Left — sticky TOC */}
        <aside className="hidden lg:block sticky top-24">
          <GuideTOC steps={steps} />
          {related.length > 0 && (
            <div className="mt-6">
              <RelatedGuides guides={related} />
            </div>
          )}
        </aside>

        {/* Centre — main content */}
        <article className="min-w-0 space-y-10">
          {documents.length > 0 && (
            <WhatToBring documents={documents} />
          )}

          <StepList steps={steps} evidence={evidence} />

          {tips.length > 0 && (
            <CommunityTips tips={tips} />
          )}

          {evidence.length > 0 && (
            <EvidenceThumbs evidence={evidence} guideSlug={slug} />
          )}
        </article>

        {/* Right — trust panel */}
        <aside className="hidden lg:block sticky top-24">
          <GuideTrustPanel
            guide={guide}
            verifiers={verifiers}
            budget={budget}
            documents={documents}
          />
        </aside>
      </div>
    </div>
  );
}
