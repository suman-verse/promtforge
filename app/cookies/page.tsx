import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/cookies';

export const metadata: Metadata = {
  title: 'Cookie Policy — PromptForge',
  description:
    'PromptForge Cookie Policy. We use zero tracking cookies. Only a single localStorage key stores your theme preference.',
  keywords: [
    'PromptForge cookie policy',
    'zero tracking cookies',
    'localStorage privacy',
    'no third party tracking',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Cookie Policy — PromptForge',
    description: 'PromptForge Cookie Policy — 100% cookie-free with zero third-party tracking.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge Cookie Policy',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy — PromptForge',
    description: 'PromptForge Cookie Policy — zero tracking cookies.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 26, 2026';

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-main mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-light border border-accent/20">
            <Cookie className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Cookie Policy
          </h1>
        </div>
        <p className="text-sm text-muted">
          Last updated: <time dateTime="2026-09-26">{LAST_UPDATED}</time>
        </p>
      </div>

      <div className="card p-6 sm:p-8 border border-theme space-y-8 text-sm leading-relaxed text-muted">

        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-base font-bold text-main mb-3">
            The Short Version
          </h2>
          <div className="p-4 rounded-xl border border-accent/20 bg-accent-light text-main font-medium">
            PromptForge sets <strong>zero cookies</strong>. No tracking, no analytics, no advertising.
            We use a single <code className="code-block px-1.5 py-0.5 rounded text-xs">localStorage</code> key
            in your browser to remember your chosen dark/light theme. It stays on your device only.
          </div>
        </section>

        <section aria-labelledby="what-are-cookies-heading">
          <h2 id="what-are-cookies-heading" className="text-base font-bold text-main mb-3">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that websites store in your browser to remember
            information about you between sessions. They can be used for essential site functions,
            analytics, advertising, and personalisation. Unlike cookies,{' '}
            <code className="code-block px-1.5 py-0.5 rounded text-xs">localStorage</code> stores
            data only in your browser and is never sent to a server automatically.
          </p>
        </section>

        <section aria-labelledby="our-use-heading">
          <h2 id="our-use-heading" className="text-base font-bold text-main mb-3">
            2. What We Use
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-theme">
                  <th className="text-left py-2 pr-4 font-semibold text-main">Storage Type</th>
                  <th className="text-left py-2 pr-4 font-semibold text-main">Key</th>
                  <th className="text-left py-2 pr-4 font-semibold text-main">Purpose</th>
                  <th className="text-left py-2 font-semibold text-main">Sent to Server?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-theme/50">
                  <td className="py-2 pr-4">
                    <code className="code-block px-1.5 py-0.5 rounded">localStorage</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code className="code-block px-1.5 py-0.5 rounded">theme</code>
                  </td>
                  <td className="py-2 pr-4">Remember dark/light mode preference</td>
                  <td className="py-2 text-green-400 font-semibold">Never</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-muted italic" colSpan={4}>
                    No cookies of any kind are set.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="third-party-cookies-heading">
          <h2 id="third-party-cookies-heading" className="text-base font-bold text-main mb-3">
            3. Third-Party Cookies
          </h2>
          <p>
            PromptForge does not embed third-party scripts that set cookies. There is no Google
            Analytics, Facebook Pixel, Hotjar, Mixpanel, Intercom, or any other tracking SDK.
          </p>
          <p className="mt-3">
            Vercel, our hosting provider, may set infrastructure cookies (e.g. edge function
            routing cookies) at the network level. These are strictly necessary for the delivery
            of the service and do not track you for advertising purposes. See{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Vercel&rsquo;s Privacy Policy
            </a>{' '}
            for details.
          </p>
        </section>

        <section aria-labelledby="consent-heading">
          <h2 id="consent-heading" className="text-base font-bold text-main mb-3">
            4. Cookie Consent
          </h2>
          <p>
            Because PromptForge sets no tracking or analytics cookies, no cookie consent banner
            is required under GDPR, ePrivacy Directive, UK PECR, or similar regulations. If we
            ever add analytics or advertising in the future, we will implement a compliant consent
            mechanism and update this policy before doing so.
          </p>
        </section>

        <section aria-labelledby="manage-heading">
          <h2 id="manage-heading" className="text-base font-bold text-main mb-3">
            5. Managing Your Preferences
          </h2>
          <p>
            To clear the theme preference stored in your browser:
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Open your browser&rsquo;s Developer Tools (F12).</li>
            <li>Go to <strong>Application → Local Storage → promptforge.vercel.app</strong>.</li>
            <li>Delete the <code className="code-block px-1.5 py-0.5 rounded text-xs">theme</code> key.</li>
          </ol>
          <p className="mt-3">
            Alternatively, you can clear all site data using your browser&rsquo;s privacy
            settings (e.g. &ldquo;Clear browsing data&rdquo; with &ldquo;Cookies and other site
            data&rdquo; checked).
          </p>
        </section>

        <section aria-labelledby="changes-heading">
          <h2 id="changes-heading" className="text-base font-bold text-main mb-3">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Cookie Policy if our practices change. The &ldquo;Last
            updated&rdquo; date at the top of this page will reflect any revisions.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-base font-bold text-main mb-3">
            7. Contact
          </h2>
          <p>
            Questions? Reach out via the{' '}
            <a
              href="https://suman-verse.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Suman Verse portfolio
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
