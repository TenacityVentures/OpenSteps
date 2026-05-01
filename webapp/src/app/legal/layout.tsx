import type { JSX } from 'react';
import AppHeader from '@/components/layout/AppHeader';

export default function LegalLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
}
