import type { JSX } from 'react';
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
  getVerificationCount,
} from '@opensteps/supabase';
import type { Guide, Step, DocumentNeeded, BudgetLine, Evidence, Tip, Verifier } from '@opensteps/types';
import { formatLeone, formatDuration } from '@/lib/format';
import GuideHeader from '@/components/guide/GuideHeader';
import GuideTOC from '@/components/guide/GuideTOC';
import GuideTrustPanel from '@/components/guide/GuideTrustPanel';
import StepList from '@/components/guide/StepList';
import WhatToBring from '@/components/guide/WhatToBring';
import BudgetBreakdown from '@/components/guide/BudgetBreakdown';
import CommunityTips from '@/components/guide/CommunityTips';
import EvidenceThumbs from '@/components/guide/EvidenceThumbs';
import RelatedGuides from '@/components/guide/RelatedGuides';
import { VerifyBanner } from '@/components/verify/VerifyBanner';

export const revalidate = 300;

interface Props {
  params: Promise<{ country: string; slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.org';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, slug } = await params;
  const client = await createClient();
  const guide = await getGuideBySlug(client, slug);
  if (!guide) return {};
  const desc =
    guide.description ??
    `${guide.steps_count} steps · ${formatLeone(guide.total_cost)} · ${formatDuration(guide.duration_days)}`;
  const url = `${BASE_URL}/${country}/guide/${slug}`;
  return {
    title: guide.title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${guide.title} — OpenSteps`,
      description: desc,
      url,
      type: 'article',
      images: [{ url: '/logo.svg', width: 512, height: 512, alt: 'OpenSteps' }],
    },
    twitter: {
      card: 'summary',
      title: guide.title,
      description: desc,
    },
  };
}

interface PageData {
  guide: Guide;
  isPending: boolean;
  country: string;
  slug: string;
  steps: Step[];
  documents: DocumentNeeded[];
  budget: BudgetLine[];
  evidence: Evidence[];
  tips: Tip[];
  verifiers: Verifier[];
  related: Pick<Guide, 'id' | 'title' | 'slug' | 'category' | 'trust_score'>[];
  verificationCount: number;
}

function GuidePage({
  guide, isPending, country, slug,
  steps, documents, budget, evidence, tips, verifiers, related, verificationCount,
}: PageData): JSX.Element {
  // HowTo structured data — helps search engines surface the guide as a rich result
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    ...(guide.description ? { description: guide.description } : {}),
    ...(guide.duration_days ? { totalTime: `P${guide.duration_days}D` } : {}),
    ...(guide.total_cost > 0 ? {
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'SLL', value: String(guide.total_cost) },
    } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description ?? s.title,
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${country}` },
      { '@type': 'ListItem', position: 2, name: guide.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isPending && (
        <div className="mb-6">
          <VerifyBanner
            guideId={guide.id}
            verificationCount={verificationCount}
            country={country}
          />
        </div>
      )}

      <GuideHeader guide={guide} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[200px_1fr_300px] gap-8 items-start">
        <aside className="hidden lg:block sticky top-24">
          <GuideTOC steps={steps} />
          {related.length > 0 && (
            <div className="mt-6">
              <RelatedGuides guides={related} country={country} />
            </div>
          )}
        </aside>

        <article className="min-w-0 space-y-10">
          {documents.length > 0 && <WhatToBring documents={documents} />}
          <StepList steps={steps} evidence={evidence} />
          <CommunityTips
            tips={tips}
            guideId={guide.id}
            steps={steps}
            country={country}
          />
          {evidence.length > 0 && <EvidenceThumbs evidence={evidence} guideSlug={slug} />}
        </article>

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
    </>
  );
}

async function fetchGuideData(client: Awaited<ReturnType<typeof createClient>>, guide: Guide) {
  return Promise.all([
    getStepsByGuide(client, guide.id),
    getDocumentsByGuide(client, guide.id),
    getBudgetLines(client, guide.id),
    getEvidenceByGuide(client, guide.id),
    getTipsByGuide(client, guide.id),
    getVerifiersByGuide(client, guide.id),
    getRelatedGuides(client, guide.id),
    getVerificationCount(client, guide.id),
  ]);
}

export default async function GuideDetailPage({ params }: Props): Promise<JSX.Element> {
  const { country, slug } = await params;
  const client = await createClient();

  const publishedGuide = await getGuideBySlug(client, slug);

  if (publishedGuide) {
    const [steps, documents, budget, evidence, tips, verifiers, related, verificationCount] =
      await fetchGuideData(client, publishedGuide);
    return (
      <GuidePage
        guide={publishedGuide}
        isPending={false}
        country={country}
        slug={slug}
        steps={steps}
        documents={documents}
        budget={budget}
        evidence={evidence}
        tips={tips}
        verifiers={verifiers}
        related={related}
        verificationCount={verificationCount}
      />
    );
  }

  // Not published — check if it's a pending guide (for community verification)
  const { data: pendingGuide } = await client.from('guides').select('*').eq('slug', slug).single();
  if (!pendingGuide) notFound();

  const [steps, documents, budget, evidence, tips, verifiers, related, verificationCount] =
    await fetchGuideData(client, pendingGuide as Guide);

  return (
    <GuidePage
      guide={pendingGuide as Guide}
      isPending
      country={country}
      slug={slug}
      steps={steps}
      documents={documents}
      budget={budget}
      evidence={evidence}
      tips={tips}
      verifiers={verifiers}
      related={related}
      verificationCount={verificationCount}
    />
  );
}
