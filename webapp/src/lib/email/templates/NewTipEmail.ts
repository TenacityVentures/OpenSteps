import { emailShell, heading, body, ctaButton, note, SITE_URL } from './shared';
import { colors } from './shared';

interface Props {
  guideAuthorName: string;
  guideTitle: string;
  country: string;
  slug: string;
  tipText: string;
  tipAuthorName: string;
}

export function NewTipEmail({ guideAuthorName, guideTitle, country, slug, tipText, tipAuthorName }: Props): string {
  const truncated = tipText.length > 160 ? tipText.slice(0, 160).trimEnd() + '…' : tipText;
  return emailShell(`
    ${heading('New tip on your guide')}
    ${body(`Hi ${guideAuthorName}, <strong style="color:#1a1a18;">${tipAuthorName}</strong> added a community tip to your guide <strong style="color:#1a1a18;">${guideTitle}</strong>:`)}
    <blockquote style="margin:0 0 24px;padding:14px 18px;border-left:3px solid ${colors.green};background:${colors.surface};border-radius:0 6px 6px 0;">
      <p style="font-size:13px;color:${colors.ink};margin:0;line-height:1.6;font-style:italic;">"${truncated}"</p>
    </blockquote>
    ${ctaButton('View guide →', `${SITE_URL}/${country}/guide/${slug}`)}
    ${note('Tips from the community help keep your guide accurate and useful.')}
  `);
}
