import type { JSX } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <header className="h-14 flex items-center px-6 border-b border-[var(--color-surface3)] bg-white">
        <Link href="/sl" className="flex items-center gap-2">
          <Logo variant="wordmark" size={26} />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
