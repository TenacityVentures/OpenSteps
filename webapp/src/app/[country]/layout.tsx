import type { JSX } from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { BottomNav } from '@/components/layout/BottomNav';
import { CountryProvider } from '@/components/CountryProvider';
import { ToastFromUrl } from '@/components/ui/ToastFromUrl';
import { COUNTRY_MAP, ACTIVE_COUNTRY_CODES } from '@opensteps/constants';
import type { CountryCode } from '@opensteps/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.org';

interface Props {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const meta = COUNTRY_MAP[country as CountryCode];
  if (!meta) return {};
  return {
    title: { template: `%s — OpenSteps ${meta.flag}`, default: `OpenSteps ${meta.flag} ${meta.name}` },
    description: `Community-verified step-by-step guides for government processes in ${meta.name}.`,
    alternates: {
      types: { 'application/rss+xml': `${BASE_URL}/${country}/feed` },
    },
  };
}

export default async function CountryLayout({ children, params }: Props): Promise<JSX.Element> {
  const { country } = await params;

  if (!(ACTIVE_COUNTRY_CODES as string[]).includes(country)) notFound();

  const meta = COUNTRY_MAP[country as CountryCode]!;

  return (
    <CountryProvider country={meta}>
      <Suspense fallback={null}>
        <ToastFromUrl />
      </Suspense>
      <AppHeader />
      <main id="main-content" className="pb-16 sm:pb-0">{children}</main>
      <AppFooter country={meta} />
      <BottomNav />
    </CountryProvider>
  );
}
