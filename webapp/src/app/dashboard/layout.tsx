import type { JSX } from 'react';
import AppHeader from '@/components/layout/AppHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
}
