import type { JSX } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getPendingGuides } from '@opensteps/supabase';
import { VerifyQueue } from '@/components/verify/VerifyQueue';

export const metadata: Metadata = { title: 'Verify Guides — OpenSteps' };
export const revalidate = 0;

interface Props {
  params: Promise<{ country: string }>;
}

export default async function VerifyPage({ params }: Props): Promise<JSX.Element> {
  const { country } = await params;
  const supabase = await createClient();
  const pending = await getPendingGuides(supabase);

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--color-ink)]">Verify guides</h1>
            {pending.length > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-green-tint)] text-[var(--color-green)] border border-[var(--color-green-soft)]">
                {pending.length} pending
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-ink-3)]">
            Review submitted guides and publish the ones that are accurate and complete.
          </p>
        </div>

        <VerifyQueue guides={pending} country={country} />
      </div>
    </main>
  );
}
