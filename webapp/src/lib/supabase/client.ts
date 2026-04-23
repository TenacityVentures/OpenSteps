'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client — use only in Client Components ('use client').
 * For server components, import from ./server instead.
 */
export function createClient() {
  return createBrowserClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
  );
}
