import type { JSX } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

export const metadata: Metadata = { title: 'My Dashboard — OpenSteps' };

export default async function DashboardPage(): Promise<JSX.Element> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/signin?next=/dashboard');

  const cookieStore = await cookies();
  const preferred = cookieStore.get('preferred_country')?.value;
  const country = preferred && (ACTIVE_COUNTRY_CODES as string[]).includes(preferred)
    ? preferred
    : (ACTIVE_COUNTRY_CODES[0] ?? 'sl');

  const displayName: string = (user.user_metadata?.['display_name'] as string | undefined)
    ?? user.email?.split('@')[0]
    ?? 'You';

  const [
    { data: verifier },
    { count: verificationCount },
    { data: editRequests },
  ] = await Promise.all([
    supabase.from('verifiers').select('*').eq('id', user.id).single(),
    supabase.from('guide_verifications').select('*', { count: 'exact', head: true }).eq('verifier_id', user.id),
    supabase.from('edit_requests').select('*, guide:guides(title, slug, country)').eq('requester_id', user.id).order('created_at', { ascending: false }).limit(5),
  ]);

  // Guides contributed via community_feed
  const { data: feedContribs } = await supabase
    .from('community_feed')
    .select('guide_id, description, created_at, guide:guides(id, title, slug, published, trust_score, country)')
    .eq('type', 'contribute')
    .eq('actor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const contributions = (feedContribs ?? []).filter((f) => f.guide);

  const initial = displayName[0]?.toUpperCase() ?? '?';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[var(--color-green)] text-white text-xl font-bold flex items-center justify-center shrink-0">
          {initial}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink)]">{displayName}</h1>
          <p className="text-sm text-[var(--color-ink-3)]">{user.email}</p>
          {verifier?.role === 'editor' && (
            <span className="text-[9px] font-mono tracking-widest border border-[var(--color-ink-3)] text-[var(--color-ink-3)] px-1.5 py-0.5 rounded uppercase">
              Editor
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Guides contributed" value={contributions.length} />
        <StatCard label="Verifications" value={verificationCount ?? 0} />
        <StatCard label="Accuracy" value={verifier?.accuracy_pct ? `${verifier.accuracy_pct}%` : '—'} />
      </div>

      {/* Contributed guides */}
      <section className="space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
          My guides
        </h2>
        {contributions.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-[var(--color-surface3)] rounded-xl">
            <p className="text-sm text-[var(--color-ink-4)]">You haven&apos;t contributed a guide yet.</p>
            <Link href={`/${country}/contribute`} className="mt-2 inline-block text-sm text-[var(--color-green)] hover:underline">
              Contribute your first guide →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {contributions.map((f) => {
              const g = f.guide as unknown as { id: string; title: string; slug: string; published: boolean; trust_score: number; country: string };
              return (
                <div key={f.guide_id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[var(--color-surface3)] gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--color-ink)] truncate">{g.title}</p>
                    <p className="text-xs font-mono text-[var(--color-ink-4)]">
                      {g.published ? (
                        <span className="text-[var(--color-green)]">Published · score {g.trust_score.toFixed(1)}</span>
                      ) : (
                        <span className="text-[var(--color-ink-3)]">Pending verification</span>
                      )}
                    </p>
                  </div>
                  <Link
                    href={`/${g.country}/guide/${g.slug}`}
                    className="shrink-0 text-xs text-[var(--color-green)] hover:underline"
                  >
                    View →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Edit requests */}
      {(editRequests ?? []).length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Edit requests
          </h2>
          <div className="space-y-2">
            {(editRequests ?? []).map((req) => {
              const g = req.guide as { title: string; slug: string; country: string } | null;
              return (
                <div key={req.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[var(--color-surface3)] gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-ink)] truncate">{g?.title ?? 'Unknown guide'}</p>
                    <p className="text-xs text-[var(--color-ink-4)] truncate">{req.reason}</p>
                  </div>
                  <span className={[
                    'shrink-0 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full',
                    req.status === 'approved' ? 'bg-[var(--color-green-tint)] text-[var(--color-green)]' :
                    req.status === 'rejected' ? 'bg-[var(--color-red-soft)] text-[var(--color-red)]' :
                    'bg-[var(--color-surface2)] text-[var(--color-ink-3)]',
                  ].join(' ')}>
                    {req.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section className="flex flex-wrap gap-3">
        <Link
          href={`/${country}/contribute`}
          className="px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors"
        >
          Contribute a guide
        </Link>
        <Link
          href={`/${country}/verify`}
          className="px-4 py-2 rounded-lg border border-[var(--color-surface3)] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
        >
          Verify guides
        </Link>
        {verifier?.role === 'editor' && (
          <Link
            href="/admin"
            className="px-4 py-2 rounded-lg border border-[var(--color-surface3)] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors"
          >
            Editor queue
          </Link>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }): JSX.Element {
  return (
    <div className="p-4 bg-white rounded-xl border border-[var(--color-surface3)] space-y-1">
      <p className="text-2xl font-bold text-[var(--color-ink)]">{value}</p>
      <p className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">{label}</p>
    </div>
  );
}
