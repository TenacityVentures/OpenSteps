import { createClient as createBrowserClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Environment variable names — same keys work in Next.js (NEXT_PUBLIC_) and Expo
const SUPABASE_URL =
  (typeof process !== 'undefined' && process.env['NEXT_PUBLIC_SUPABASE_URL']) ||
  (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_SUPABASE_URL']) ||
  '';

const SUPABASE_ANON_KEY =
  (typeof process !== 'undefined' && process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']) ||
  (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY']) ||
  '';

/**
 * Browser / React Native client.
 * - Use this in mobile/ (Expo) directly.
 * - In webapp/, prefer the SSR-aware createServerClient from @supabase/ssr
 *   (see webapp/src/lib/supabase/server.ts).
 */
export function createClient(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or EXPO_PUBLIC_ variants).',
    );
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Singleton for use in mobile (React Native doesn't have SSR)
let _client: SupabaseClient | null = null;
export function getClient(): SupabaseClient {
  if (!_client) _client = createClient();
  return _client;
}
