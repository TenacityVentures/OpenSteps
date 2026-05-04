import { emailShell, heading, body, ctaButton, note, SITE_URL } from './shared';

interface Props {
  displayName: string;
  guideTitle: string;
  country: string;
}

export function GuideSubmittedEmail({ displayName, guideTitle, country }: Props): string {
  return emailShell(`
    ${heading('Your guide is in review')}
    ${body(`Hi ${displayName}, thanks for submitting <strong style="color:#1a1a18;">${guideTitle}</strong> to OpenSteps. Our editors and community will verify it — you'll hear from us once it's live.`)}
    ${ctaButton('See verification queue →', `${SITE_URL}/${country}/verify`)}
    ${note('Questions? Reply to this email and someone from the team will get back to you.')}
  `);
}
