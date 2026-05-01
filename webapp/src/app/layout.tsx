import type { JSX } from 'react';
import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opensteps.org';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: 'OpenSteps', template: '%s — OpenSteps' },
  description:
    'Step-by-step guides for real-world government processes in Sierra Leone. Community-verified, free to use.',
  openGraph: {
    siteName: 'OpenSteps',
    locale: 'en_SL',
    type: 'website',
    images: [{ url: '/logo.svg', width: 512, height: 512, alt: 'OpenSteps' }],
  },
  twitter: {
    card: 'summary',
    title: 'OpenSteps',
    description: 'Community-verified guides for government processes.',
  },
  manifest: '/manifest.webmanifest',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpenSteps',
  url: BASE_URL,
  logo: `${BASE_URL}/logo-icon.svg`,
  description: 'Community-verified step-by-step guides for government processes.',
  sameAs: ['https://github.com/tenacityventures/opensteps'],
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-bg)]">
        {/* Skip navigation — visible on :focus for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--color-green)] focus:text-white focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
