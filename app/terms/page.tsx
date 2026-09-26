import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/terms';

export const metadata: Metadata = {
  title: 'Terms of Service — PromptForge',
  description:
    'PromptForge Terms of Service. Clear, fair guidelines for using PromptForge — a free developer and prompt engineering tool.',
  keywords: [
    'PromptForge terms of service',
    'terms and conditions',
    'acceptable use policy',
    'prompt generator terms',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Terms of Service — PromptForge',
    description: 'Clear, fair guidelines for using PromptForge.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge Terms of Service',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — PromptForge',
    description: 'Clear, fair guidelines for using PromptForge.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 26, 2026';

export default function TermsPage() {
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
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Terms of Service
          </h1>
        </div>
        <p className="text-sm text-muted">
          Last updated: <time dateTime="2026-09-26">{LAST_UPDATED}</time>
        </p>
      </div>

      <div className="card p-6 sm:p-8 border border-theme space-y-8 text-sm leading-relaxed text-muted">

        <section aria-labelledby="acceptance-heading">
          <h2 id="acceptance-heading" className="text-base font-bold text-main mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using PromptForge (&ldquo;the Service&rdquo;) at{' '}
            <a
              href="https://promptforge.vercel.app"
              className="text-accent hover:underline"
            >
              promptforge.vercel.app
            </a>
            , you agree to be bound by these Terms of Service. If you do not agree, please do
            not use the Service. The Service is provided by Suman Verse (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;).
          </p>
        </section>

        <section aria-labelledby="service-heading">
          <h2 id="service-heading" className="text-base font-bold text-main mb-3">
            2. Description of Service
          </h2>
          <p>
            PromptForge is a free, browser-based tool for generating and optimizing AI prompts.
            It operates in two modes:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Offline / Deterministic mode</strong> — generates prompts entirely
              client-side with no external API calls.
            </li>
            <li>
              <strong>AI mode</strong> — forwards your input to large language models via
              OpenRouter to produce AI-generated prompts.
            </li>
          </ul>
        </section>

        <section aria-labelledby="acceptable-use-heading">
          <h2 id="acceptable-use-heading" className="text-base font-bold text-main mb-3">
            3. Acceptable Use
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Generate prompts intended to produce illegal, harmful, abusive, or harassing content.</li>
            <li>Circumvent safety measures or content policies of any AI provider.</li>
            <li>Attempt to extract, reverse-engineer, or scrape the Service in a way that degrades performance for others.</li>
            <li>Use automated means to make excessive API requests that could cause abuse of the OpenRouter tier.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to suspend or restrict access for violations, at our sole
            discretion and without prior notice.
          </p>
        </section>

        <section aria-labelledby="ip-heading">
          <h2 id="ip-heading" className="text-base font-bold text-main mb-3">
            4. Intellectual Property
          </h2>
          <p>
            The PromptForge codebase, design, and brand assets are owned by Suman Verse and
            protected by applicable copyright law. The prompts you generate belong to you —
            we claim no ownership over content you produce using the Service.
          </p>
          <p className="mt-3">
            You grant us a limited, non-exclusive license to transmit your input to AI providers
            on your behalf when using AI mode. This transmission is ephemeral and not stored by
            us after the response is returned.
          </p>
        </section>

        <section aria-labelledby="third-party-heading">
          <h2 id="third-party-heading" className="text-base font-bold text-main mb-3">
            5. Third-Party AI Providers
          </h2>
          <p>
            When AI mode is used, your prompt text is processed by OpenRouter and the
            underlying LLM providers (OpenAI, Anthropic, Google, Meta, etc.). Your use of AI
            mode is also subject to the terms and policies of those providers. We are not
            responsible for the availability, accuracy, or safety of third-party AI outputs.
          </p>
        </section>

        <section aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-base font-bold text-main mb-3">
            6. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied. We do not warrant that the Service will
            be uninterrupted, error-free, or that AI-generated prompts will meet your
            requirements or produce a particular result.
          </p>
        </section>

        <section aria-labelledby="liability-heading">
          <h2 id="liability-heading" className="text-base font-bold text-main mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Suman Verse shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including loss of
            profits, data, or goodwill, arising out of your use of or inability to use the
            Service, even if advised of the possibility of such damages.
          </p>
        </section>

        <section aria-labelledby="changes-heading">
          <h2 id="changes-heading" className="text-base font-bold text-main mb-3">
            8. Changes to These Terms
          </h2>
          <p>
            We may modify these Terms at any time. Updated terms take effect upon posting with a
            revised &ldquo;Last updated&rdquo; date. Continued use of the Service after changes
            constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section aria-labelledby="governing-law-heading">
          <h2 id="governing-law-heading" className="text-base font-bold text-main mb-3">
            9. Governing Law
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-base font-bold text-main mb-3">
            10. Contact
          </h2>
          <p>
            Questions about these Terms? Reach out via the{' '}
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
