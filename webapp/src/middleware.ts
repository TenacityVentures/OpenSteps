import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ACTIVE_COUNTRY_CODES } from '@opensteps/constants';

// Segments that live at /{segment}/... but are NOT country codes
const GLOBAL_SEGMENTS = new Set(['auth', 'admin', 'dashboard', '_next', 'favicon.ico']);

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // 1. Refresh Supabase session on every request (keeps JWT alive)
  const supabase = createServerClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Parameters<NonNullable<CookieMethodsServer['setAll']>>[0]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: do not add logic between createServerClient and getUser()
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 2. Validate country segment — redirect unknown codes to home; persist valid ones
  const countryMatch = pathname.match(/^\/([a-z]{2,3})(\/|$)/);
  if (countryMatch) {
    const segment = countryMatch[1]!;
    if (
      !GLOBAL_SEGMENTS.has(segment) &&
      !(ACTIVE_COUNTRY_CODES as string[]).includes(segment)
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if ((ACTIVE_COUNTRY_CODES as string[]).includes(segment)) {
      supabaseResponse.cookies.set('preferred_country', segment, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
  }

  // 3. Protect /dashboard and /admin — require auth
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = new URL('/auth/signin', request.url);
      redirectUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 4. Redirect authed users away from auth pages
  if (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup')) {
    if (user) {
      return NextResponse.redirect(new URL(`/${ACTIVE_COUNTRY_CODES[0] ?? 'sl'}`, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)',
  ],
};
