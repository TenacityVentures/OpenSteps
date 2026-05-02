'use client';

import type { JSX, ReactElement } from 'react';
import { Suspense, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const inp = 'w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

function SignInForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push(next);
        router.refresh();
      }
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
            onChange={(e) => setEmail(e.target.value)}
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

export default function SignInPage(): ReactElement {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
