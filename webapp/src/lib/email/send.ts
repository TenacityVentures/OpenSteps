// The only file in this codebase that knows about Resend.
// To switch providers, replace the implementation here — nothing else changes.

import { Resend } from 'resend';

const FROM = 'OpenSteps <noreply@10na.city>';

let _client: Resend | null = null;

function getClient(): Resend {
  if (!_client) _client = new Resend(process.env.RESEND_API_KEY);
  return _client;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping send to', to);
    return;
  }
  const { error } = await getClient().emails.send({ from: FROM, to, subject, html });
  if (error) {
    // Log but never throw — email failure must not break the user's action
    console.error('[email] send failed', { to, subject, error });
  }
}
