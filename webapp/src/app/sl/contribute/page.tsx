import type { Metadata } from 'next';
import { ContributeWizard } from '@/components/contribute/ContributeWizard';

export const metadata: Metadata = {
  title: 'Contribute a Guide',
  description: 'Share your experience with a government process and help your community.',
};

export default function ContributePage() {
  return <ContributeWizard />;
}
