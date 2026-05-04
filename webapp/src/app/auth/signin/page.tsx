'use client';

import type { JSX } from 'react';
import { Suspense, useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast, TOAST_MESSAGES } from '@/components/ui/Toaster';

const inp = 'w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

function SignInForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/';
  const toastKey = searchParams.get('toast');
  const { toast } = useToast();

  useEffect(() => {
    if (!toastKey) return;
    const entry = TOAST_MESSAGES[toastKey];
    if (entry) toast(entry.message, entry.type);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isResending, startResend] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUnconfirmed(false);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setUnconfirmed(true);
        } else {
          setError(error.message);
        }
      } else {
        router.push(next);
        router.refresh();
      }
    });
  }

  function handleResend() {
    startResend(async () => {
      const supabase = createClient();
      await supabase.auth.resend({ type: 'signup', email });
      setResendSent(true);
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Sign in</h1>
        <p className="text-sm text-[var(--color-ink-3)]">Welcome back to OpenSteps</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            className={inp}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setUnconfirmed(false); }}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            className={inp}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-[var(--color-red)]">{error}</p>
        )}

        {unconfirmed && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 space-y-2">
            <p className="text-sm text-amber-800">
              This email hasn&apos;t been confirmed yet. Check your inbox for the confirmation link.
            </p>
            {resendSent ? (
              <p className="text-xs font-mono text-amber-700">Confirmation email resent.</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-xs font-mono text-amber-700 underline underline-offset-2 hover:text-amber-900 disabled:opacity-50"
              >
                {isResending ? 'Sending…' : 'Resend confirmation email'}
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 rounded-lg bg-[var(--color-green)] text-white font-semibold text-sm hover:bg-[var(--color-green-mid)] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-center text-[var(--color-ink-3)]">
        No account?{' '}
        <Link href={`/auth/signup${next !== '/' ? `?next=${next}` : ''}`} className="text-[var(--color-green)] hover:underline font-medium">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
