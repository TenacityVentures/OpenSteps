import type { JSX } from 'react';
import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

export const metadata: Metadata = { title: 'Editor Panel — OpenSteps' };
export const revalidate = 0;

export default async function AdminPage(): Promise<JSX.Element> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/signin?next=/admin');

  const { data: verifier } = await supabase.from('verifiers').select('role').eq('id', user.id).single();
  if (verifier?.role !== 'editor') notFound();

  const admin = createAdminClient();
  const country = ACTIVE_COUNTRY_CODES[0] ?? 'sl';

  const [
    { count: pendingCount },
    { count: editRequestCount },
    { data: recentFeed },
  ] = await Promise.all([
    admin.from('guides').select('*', { count: 'exact', head: true }).eq('published', false),
    admin.from('edit_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('community_feed').select('*').order('created_at', { ascending: false }).limit(10),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Editor</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Panel</h1>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/${country}/verify`}
          className="group p-5 bg-white rounded-xl border border-[var(--color-surface3)] hover:border-[var(--color-green)] transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors">
              Verify queue
            </h2>
            {(pendingCount ?? 0) > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-green-tint)] text-[var(--color-green)] border border-[var(--color-green-soft)]">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-ink-3)]">
            Review, approve or flag submitted guides.
          </p>
        </Link>

        <Link
          href="/admin/edit-requests"
          className="group p-5 bg-white rounded-xl border border-[var(--color-surface3)] hover:border-[var(--color-green)] transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors">
              Edit requests
            </h2>
            {(editRequestCount ?? 0) > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {editRequestCount} pending
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-ink-3)]">
            Approve or reject requests to edit published guides.
          </p>
        </Link>
      </div>

      {/* Recent activity */}
      {(recentFeed ?? []).length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Recent activity
          </h2>
          <div className="space-y-1">
            {(recentFeed ?? []).map((f) => (
              <div key={f.id} className="flex items-start gap-3 py-2.5 border-b border-[var(--color-surface3)] last:border-0">
                <span className={[
                  'shrink-0 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded mt-0.5',
                  f.type === 'verify' ? 'bg-[var(--color-green-tint)] text-[var(--color-green)]' :
                  f.type === 'contribute' ? 'bg-blue-50 text-blue-600' :
                  f.type === 'flag' ? 'bg-[var(--color-red-soft)] text-[var(--color-red)]' :
                  'bg-[var(--color-surface2)] text-[var(--color-ink-3)]',
                ].join(' ')}>
                  {f.type}
                </span>
                <p className="text-sm text-[var(--color-ink-2)] flex-1 min-w-0">{f.description}</p>
                <span className="text-xs font-mono text-[var(--color-ink-4)] shrink-0">
                  {new Date(f.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
