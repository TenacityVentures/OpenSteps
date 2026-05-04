import { emailShell, heading, body, ctaButton, note, SITE_URL } from './shared';

interface Props {
  displayName: string;
  country: string;
}

export function WelcomeEmail({ displayName, country }: Props): string {
  return emailShell(`
    ${heading(`Welcome, ${displayName}`)}
    ${body("Your email is confirmed and your OpenSteps account is ready. You can now verify guides, contribute your own, and help your community navigate government processes with confidence.")}
    ${ctaButton('Start exploring →', `${SITE_URL}/${country}`)}
    ${note('If you have questions or feedback, just reply to this email. We read every message.')}
  `);
}
