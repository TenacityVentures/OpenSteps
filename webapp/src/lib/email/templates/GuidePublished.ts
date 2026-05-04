import { emailShell, heading, body, ctaButton, note, SITE_URL } from './shared';

interface Props {
  displayName: string;
  guideTitle: string;
  country: string;
  slug: string;
}

export function GuidePublishedEmail({ displayName, guideTitle, country, slug }: Props): string {
  return emailShell(`
    ${heading("Your guide is live ✓")}
    ${body(`Hi ${displayName}, great news — <strong style="color:#1a1a18;">${guideTitle}</strong> has passed verification and is now publicly available on OpenSteps.`)}
    ${ctaButton('View your guide →', `${SITE_URL}/${country}/guide/${slug}`)}
    ${note('Every time someone follows your guide, they benefit from your experience. Thank you for contributing.')}
  `);
}
