import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client for use in RSCs and Server Actions.
 * Uses @supabase/ssr for proper cookie-based session management.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Parameters<NonNullable<CookieMethodsServer['setAll']>>[0]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from RSC — safe to ignore (no mutations in RSC)
          }
        },
      },
    },
  );
}
