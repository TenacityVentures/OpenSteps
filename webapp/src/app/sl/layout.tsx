import type { Metadata } from 'next';
import AppHeader from '@/components/layout/AppHeader';

export const metadata: Metadata = {
  title: 'Sierra Leone',
  description: 'Community-verified step-by-step guides for government processes in Sierra Leone.',
};

export default function SlLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
}
