'use client';

import type { JSX } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approveEditRequest, rejectEditRequest } from '@/app/[country]/verify/actions';

export interface EditRequestItem {
  id: string;
  reason: string;
  status: string;
  created_at: string;
  guide: { title: string; slug: string; country: string } | null;
  requester: { display_name: string } | null;
}

export function EditRequestList({ requests }: { requests: EditRequestItem[] }): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handle(id: string, action: 'approve' | 'reject') {
    setErrors((e) => ({ ...e, [id]: '' }));
    startTransition(async () => {
      try {
        if (action === 'approve') await approveEditRequest(id);
        else await rejectEditRequest(id);
        router.refresh();
      } catch (err) {
        setErrors((e) => ({ ...e, [id]: err instanceof Error ? err.message : 'Failed' }));
      }
    });
  }

  if (requests.length === 0) {
    return (
      <p className="text-sm text-[var(--color-ink-4)] italic text-center py-12">
        No pending edit requests.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <div key={req.id} className="p-5 bg-white rounded-xl border border-[var(--color-surface3)] space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="space-y-0.5">
              <p className="font-semibold text-[var(--color-ink)]">
                {req.guide?.title ?? 'Unknown guide'}
              </p>
              <p className="text-xs font-mono text-[var(--color-ink-4)]">
                by {req.requester?.display_name ?? 'someone'} ·{' '}
                {new Date(req.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </p>
            </div>
            <span className={[
              'text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border',
              req.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              req.status === 'approved' ? 'bg-[var(--color-green-tint)] text-[var(--color-green)] border-[var(--color-green-soft)]' :
              'bg-[var(--color-red-soft)] text-[var(--color-red)] border-[var(--color-red-soft)]',
            ].join(' ')}>
              {req.status}
            </span>
          </div>

          <div className="text-sm text-[var(--color-ink-2)] bg-[var(--color-surface2)] px-3 py-2 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-4)] block mb-0.5">
              Reason
            </span>
            {req.reason}
          </div>

          {errors[req.id] && (
            <p className="text-xs text-[var(--color-red)]">{errors[req.id]}</p>
          )}

          {req.status === 'pending' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handle(req.id, 'reject')}
                disabled={isPending}
                className="px-4 py-2 rounded-lg border border-[var(--color-surface3)] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface2)] transition-colors disabled:opacity-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handle(req.id, 'approve')}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-[var(--color-green)] text-white text-sm font-medium hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
              >
                Approve (unpublish for edit)
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
