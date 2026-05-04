import { emailShell, heading, body, ctaButton, note, SITE_URL } from './shared';

interface Props {
  displayName: string;
  guideTitle: string;
  country: string;
  slug: string;
}

export function VerificationMilestoneEmail({ displayName, guideTitle, country, slug }: Props): string {
  return emailShell(`
    ${heading('Your guide just went live')}
    ${body(`Hi ${displayName}, <strong style="color:#1a1a18;">${guideTitle}</strong> has received 5 community verifications and has been automatically published on OpenSteps. It's now publicly available.`)}
    ${ctaButton('View your guide →', `${SITE_URL}/${country}/guide/${slug}`)}
    ${note('Community verification means real people have followed this process and confirmed it works. That\'s a big deal — thank you for contributing.')}
  `);
}
