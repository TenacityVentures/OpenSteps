'use client';

import type { JSX } from 'react';
import { Suspense, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { COUNTRIES } from '@opensteps/constants';
import type { CountryCode } from '@opensteps/types';

const inp = 'w-full px-3 py-2.5 bg-white border border-[var(--color-surface3)] rounded-[var(--radius)] text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] focus:border-[var(--color-green)] transition-colors';

function SignUpForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? null;
  const activeCountries = COUNTRIES.filter((c) => c.active);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState(activeCountries[0]?.code ?? 'sl');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName.trim(), preferred_country: country },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        document.cookie = `preferred_country=${country};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
        router.push(next ?? `/${country}`);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Create account</h1>
        <p className="text-sm text-[var(--color-ink-3)]">Join the OpenSteps community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
            Display name
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            className={inp}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="How you'll appear to others"
          />
        </div>

        {activeCountries.length > 1 && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-3)]">
              Country
            </label>
            <select
              className={inp}
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
            >
              {activeCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
            minLength={8}
            autoComplete="new-password"
            className={inp}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
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
          {isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-center text-[var(--color-ink-3)]">
        Already have an account?{' '}
        <Link href={`/auth/signin${next ? `?next=${next}` : ''}`} className="text-[var(--color-green)] hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignUpPage(): JSX.Element {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
