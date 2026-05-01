import type { JSX } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EditRequestList, type EditRequestItem } from '@/components/admin/EditRequestList';

export const metadata: Metadata = { title: 'Edit Requests — OpenSteps' };
export const revalidate = 0;

export default async function EditRequestsPage(): Promise<JSX.Element> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/signin?next=/admin/edit-requests');

  const { data: verifier } = await supabase.from('verifiers').select('role').eq('id', user.id).single();
  if (verifier?.role !== 'editor') redirect('/dashboard');

  const admin = createAdminClient();
  const { data: requests } = await admin
    .from('edit_requests')
    .select(`
      id, reason, status, created_at,
      guide:guides(title, slug, country),
      requester:verifiers!edit_requests_requester_id_fkey(display_name)
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  const pendingCount = (requests ?? []).filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors">
          ← Admin
        </Link>
        <div className="flex-1" />
        {pendingCount > 0 && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            {pendingCount} pending
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-4)]">Editor</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Edit requests</h1>
        <p className="text-sm text-[var(--color-ink-3)]">
          Approving a request unpublishes the guide so the original author can revise it.
        </p>
      </div>

      <EditRequestList requests={(requests ?? []) as unknown as EditRequestItem[]} />
    </div>
  );
}
