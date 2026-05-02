import type { JSX } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ContributeWizard } from '@/components/contribute/ContributeWizard';

export const metadata: Metadata = {
  title: 'Contribute a Guide',
  description: 'Share your experience with a government process and help your community.',
};

interface Props {
  params: Promise<{ country: string }>;
}

export default async function ContributePage({ params }: Props): Promise<JSX.Element> {
  const { country } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/signin?next=/${country}/contribute&toast=contribute`);
  }

  return <ContributeWizard />;
}
