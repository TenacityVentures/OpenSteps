import type { JSX } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — OpenSteps',
  description: 'The rules and guidelines for using OpenSteps.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-[var(--color-ink)]">{title}</h2>
      <div className="text-sm text-[var(--color-ink-2)] leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function TermsPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-10">

      <div className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-4)]">Legal</p>
        <h1 className="text-3xl font-bold text-[var(--color-ink)]">Terms of Service</h1>
        <p className="text-sm text-[var(--color-ink-3)]">Last updated: May 2026</p>
      </div>

      <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
        By using OpenSteps you agree to these terms. OpenSteps is a community platform — its value
        comes from accurate, honest contributions from people like you.
      </p>

      <Section title="What OpenSteps is">
        <p>
          OpenSteps is a community-maintained knowledge base of step-by-step guides for navigating
          government and civic processes. It is not affiliated with any government body. The
          information on this platform is contributed by community members and may not be
          officially accurate or up to date.
        </p>
        <p>
          Always verify critical information with the relevant government authority before acting on it.
        </p>
      </Section>

      <Section title="Community guidelines">
        <p>When contributing guides, tips, or verifications, you agree to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Submit only information you have personal experience with or reliable knowledge of</li>
          <li>Keep content accurate, respectful, and free of spam or misinformation</li>
          <li>Not impersonate government officials or organisations</li>
          <li>Not submit duplicate, test, or obviously fabricated content</li>
          <li>Not use the platform to harass, defame, or harm others</li>
        </ul>
      </Section>

      <Section title="Content ownership">
        <p>
          You retain ownership of content you submit. By posting, you grant OpenSteps a
          worldwide, royalty-free licence to display and distribute your contributions
          on the platform. You may request removal at any time.
        </p>
        <p>
          We reserve the right to remove content that violates these guidelines without notice.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          You are responsible for keeping your login credentials secure.
          You may not create accounts on behalf of others or use automated means to create accounts.
          We may suspend or delete accounts that violate these terms.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>You may not use OpenSteps to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Scrape or bulk-download content in ways that harm platform performance</li>
          <li>Attempt to gain unauthorised access to platform systems</li>
          <li>Distribute malware or engage in phishing</li>
          <li>Violate any applicable law or regulation</li>
        </ul>
      </Section>

      <Section title="No warranty">
        <p>
          OpenSteps is provided <strong>as-is</strong>, without warranty of any kind.
          We do not guarantee the accuracy, completeness, or timeliness of any guide.
          We are not liable for any losses arising from reliance on information on this platform.
        </p>
      </Section>

      <Section title="Changes to terms">
        <p>
          We may update these terms at any time. We will notify users of material changes
          via the platform. Continued use after notification constitutes acceptance.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms?{' '}
          <a href="mailto:legal@opensteps.org" className="text-[var(--color-green)] hover:underline">
            legal@opensteps.org
          </a>
        </p>
      </Section>

      <div className="pt-6 border-t border-[var(--color-surface3)] flex gap-4 text-sm">
        <Link href="/legal/privacy" className="text-[var(--color-green)] hover:underline">Privacy Policy →</Link>
      </div>

    </div>
  );
}
