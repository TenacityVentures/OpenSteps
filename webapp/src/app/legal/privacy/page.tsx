import type { JSX } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — OpenSteps',
  description: 'How OpenSteps collects, uses, and protects your information.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-[var(--color-ink)]">{title}</h2>
      <div className="text-sm text-[var(--color-ink-2)] leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function PrivacyPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-10">

      <div className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">Legal</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-ink-3)]">Last updated: May 2026</p>
      </div>

      <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
        OpenSteps is a community platform that helps people navigate government processes.
        We take your privacy seriously. This policy explains what we collect, why, and your rights.
      </p>

      <Section title="What we collect">
        <p>When you create an account we store:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Your email address (for authentication only)</li>
          <li>A display name you choose</li>
          <li>Your activity on the platform — guides submitted, verifications, tips, and upvotes</li>
        </ul>
        <p>
          We do not collect payment information, government IDs, or any sensitive personal data.
          We do not run advertising or track you across other websites.
        </p>
      </Section>

      <Section title="How we use it">
        <p>Your information is used solely to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Authenticate you and keep your session secure</li>
          <li>Display your display name and contribution history on the platform</li>
          <li>Calculate leaderboard rankings and verification scores</li>
          <li>Send essential account emails (password reset, sign-in links)</li>
        </ul>
        <p>We never sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </Section>

      <Section title="Data storage">
        <p>
          Your data is stored securely using <strong>Supabase</strong>, hosted on AWS infrastructure in the EU.
          Authentication is handled by Supabase Auth with industry-standard encryption.
          Passwords are never stored in plain text.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          We use a single first-party cookie (<code className="text-xs bg-[var(--color-surface2)] px-1 py-0.5 rounded font-mono">preferred_country</code>)
          to remember your country preference. No third-party tracking cookies are used.
        </p>
      </Section>

      <Section title="Community content">
        <p>
          Guides, tips, and comments you submit are public and attributed to your display name.
          They may be indexed by search engines. If you want your contributions removed,
          contact us at the address below.
        </p>
      </Section>

      <Section title="Your rights">
        <p>You may at any time:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Request a copy of your data</li>
          <li>Request deletion of your account and associated data</li>
          <li>Update your display name from your dashboard</li>
        </ul>
        <p>
          To exercise these rights, email us at{' '}
          <a href="mailto:privacy@opensteps.org" className="text-[var(--color-green)] hover:underline">
            privacy@opensteps.org
          </a>
          . We respond within 14 days.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update this policy as the platform evolves. Material changes will be announced
          on the platform. Continued use after changes constitutes acceptance.
        </p>
      </Section>

      <div className="pt-6 border-t border-[var(--color-surface3)] flex gap-4 text-sm">
        <Link href="/legal/terms" className="text-[var(--color-green)] hover:underline">Terms of Service →</Link>
      </div>

    </div>
  );
}
