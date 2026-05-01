import type { JSX } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <AppHeader />
      <main className="pb-16 sm:pb-0">{children}</main>
      <BottomNav />
    </>
  );
}
