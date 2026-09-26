import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/privacy';

export const metadata: Metadata = {
  title: 'Privacy Policy — PromptForge',
  description:
    'PromptForge Privacy Policy. Learn how we handle your data — we collect zero personal data, require no accounts, and never sell your information.',
  keywords: [
    'PromptForge privacy policy',
    'AI tool privacy',
    'zero tracking',
    'no account required',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Privacy Policy — PromptForge',
    description: 'Learn how PromptForge protects user privacy with zero data tracking.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge Privacy Policy',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — PromptForge',
    description: 'PromptForge Privacy Policy — zero personal data tracking.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 26, 2026';

export default function PrivacyPage() {
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
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Privacy Policy
          </h1>
        </div>
        <p className="text-sm text-muted">
          Last updated: <time dateTime="2026-09-26">{LAST_UPDATED}</time>
        </p>
      </div>

      <div className="card p-6 sm:p-8 border border-theme space-y-8 text-sm leading-relaxed text-muted">

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-base font-bold text-main mb-3">
            Overview
          </h2>
          <p>
            PromptForge (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;) is a
            free AI prompt engineering tool built and maintained by{' '}
            <a
              href="https://suman-verse.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Suman Verse
            </a>
            . We are committed to protecting your privacy. This policy explains what data we
            collect (very little), how we use it, and your rights.
          </p>
          <p className="mt-3 font-semibold text-main">
            Short version: We collect no personal information. No accounts, no tracking pixels,
            no advertising cookies. The prompt you type stays on your device.
          </p>
        </section>

        <section aria-labelledby="data-collected-heading">
          <h2 id="data-collected-heading" className="text-base font-bold text-main mb-3">
            1. Data We Collect
          </h2>
          <h3 className="text-sm font-semibold text-main mb-1">a) Data you provide directly</h3>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>
              <strong>Prompt text</strong> — when you use the AI-powered Generator or Optimizer,
              the text you enter is sent to our backend API route, which forwards it to{' '}
              <a
                href="https://openrouter.ai/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                OpenRouter
              </a>{' '}
              to call an LLM. We do not store this text after the request completes.
            </li>
          </ul>
          <h3 className="text-sm font-semibold text-main mb-1">b) Automatically collected data</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Server logs (Vercel)</strong> — our hosting provider Vercel automatically
              logs basic request metadata (IP address, URL path, HTTP method, response status,
              timestamp). These logs are retained by Vercel under their own{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Privacy Policy
              </a>
              . We do not export or process these logs for analytics.
            </li>
            <li>
              <strong>No cookies</strong> — PromptForge does not set any first-party cookies.
              No session cookies, no analytics cookies, no tracking cookies.
            </li>
          </ul>
        </section>

        <section aria-labelledby="third-parties-heading">
          <h2 id="third-parties-heading" className="text-base font-bold text-main mb-3">
            2. Third-Party Services
          </h2>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-main">OpenRouter (AI API)</p>
              <p>
                When you request AI-generated or AI-improved prompts, your input is sent to
                OpenRouter&rsquo;s API. OpenRouter may log requests for abuse prevention and
                billing. Review their{' '}
                <a
                  href="https://openrouter.ai/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Privacy Policy
                </a>
                . The offline (deterministic) mode does not make any external requests.
              </p>
            </div>
            <div>
              <p className="font-semibold text-main">Vercel (Hosting)</p>
              <p>
                PromptForge is hosted on Vercel. Vercel processes request metadata as described
                above. See{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Vercel&rsquo;s Privacy Policy
                </a>
                .
              </p>
            </div>
            <div>
              <p className="font-semibold text-main">Google Fonts</p>
              <p>
                We load the Inter and JetBrains Mono fonts via Next.js&rsquo;s built-in font
                optimization, which downloads fonts at build time and serves them from our own
                domain. No requests are made to Google&rsquo;s servers by your browser.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="cookies-heading">
          <h2 id="cookies-heading" className="text-base font-bold text-main mb-3">
            3. Cookies &amp; Local Storage
          </h2>
          <p>
            PromptForge does not use any cookies. We use your browser&rsquo;s{' '}
            <code className="code-block px-1.5 py-0.5 rounded text-xs">localStorage</code> to
            remember your preferred color theme (dark/light). This data never leaves your device
            and is not transmitted to any server.
          </p>
        </section>

        <section aria-labelledby="childrens-heading">
          <h2 id="childrens-heading" className="text-base font-bold text-main mb-3">
            4. Children&rsquo;s Privacy
          </h2>
          <p>
            PromptForge is not directed at children under 13. We do not knowingly collect
            personal information from children. If you believe a child has submitted personal
            data through our service, please contact us so we can investigate.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading" className="text-base font-bold text-main mb-3">
            5. Your Rights
          </h2>
          <p>
            Because we do not collect personal data, there is generally nothing to access,
            correct, or delete. If you have concerns about Vercel&rsquo;s server log data, please
            contact Vercel directly per their privacy policy. For any other privacy concerns,
            reach out to us (see contact below).
          </p>
        </section>

        <section aria-labelledby="changes-heading">
          <h2 id="changes-heading" className="text-base font-bold text-main mb-3">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at
            the top of this page reflects the most recent revision. Continued use of the Service
            after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-base font-bold text-main mb-3">
            7. Contact
          </h2>
          <p>
            Questions about this policy? Reach out via the{' '}
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
