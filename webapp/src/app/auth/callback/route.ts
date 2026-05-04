import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { sendEmail, WelcomeEmail } from '@/lib/email';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get('code');
  const next  = searchParams.get('next') ?? '/sl';

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    // Send welcome email on first confirmation
    if (data.user?.email && data.user.email_confirmed_at) {
      const admin = createAdminClient();
      const { data: { user } } = await admin.auth.admin.getUserById(data.user.id);
      const alreadyWelcomed = user?.user_metadata?.['welcome_sent'] === true;

      if (!alreadyWelcomed) {
        const displayName =
          (user?.user_metadata?.['display_name'] as string | undefined) ??
          data.user.email.split('@')[0] ??
          'there';
        const country = (user?.user_metadata?.['preferred_country'] as string | undefined) ?? 'sl';

        await sendEmail({
          to: data.user.email,
          subject: `Welcome to OpenSteps, ${displayName}`,
          html: WelcomeEmail({ displayName, country }),
        });

        // Mark welcome as sent so we don't send it again
        await admin.auth.admin.updateUserById(data.user.id, {
          user_metadata: { ...user?.user_metadata, welcome_sent: true },
        });

        return NextResponse.redirect(new URL(`/${country}?toast=welcome`, origin));
      }
    }
  }

  return NextResponse.redirect(new URL(next, origin));
}
