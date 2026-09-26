'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles, ArrowRight, ShieldCheck, Zap, Sliders,
  Globe, ExternalLink, HelpCircle, ChevronDown
} from 'lucide-react';

const FAQS = [
  {
    q: 'What is PromptForge and how does it improve AI responses?',
    a: 'PromptForge is a precision prompt engineering tool engineered by Suman Verse. Instead of sending vague, one-sentence instructions that cause AI models to hallucinate or return generic answers, PromptForge systematically frames the prompt with senior domain authority, rich context, negative constraints, and structured output formatting.',
  },
  {
    q: 'Which AI models are supported by PromptForge?',
    a: 'PromptForge is optimized across major frontier models including OpenAI GPT-4o and o3-mini, Anthropic Claude 3.5 & 3.7 Sonnet, Google Gemini 2.0 Flash, DeepSeek-R1 (Reasoning) & V3, and Meta Llama 3.3. Prompts are formatted to leverage each model’s specific instruction-following strengths.',
  },
  {
    q: 'What is the Prompt Quality Score (0–100)?',
    a: 'The Quality Score evaluates prompts on five 20-point pillars: Clarity, Specificity, Context, Negative Constraints, and Output Schema adherence. Prompts scoring 90+ adhere to production guidelines with zero placeholders and minimal hallucination risk.',
  },
  {
    q: 'Is PromptForge free and is an account required?',
    a: 'PromptForge is 100% free with no account or credit card required. You can generate custom prompts, optimize existing instructions, and copy curated templates from our library immediately.',
  },
  {
    q: 'Can I use generated prompts for commercial software development?',
    a: 'Yes. All generated prompts and templates are completely free for personal, educational, and commercial use. You have full ownership of any prompts generated.',
  },
];

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="space-y-20 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-16 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 mb-6">
            <span className="badge">
              <Sparkles className="w-3.5 h-3.5" />
              Made by Suman Verse
            </span>
          </div>

          <h1 className="animate-fade-up text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-main leading-[1.08] mb-6">
            Turn ideas into <span className="text-accent">better prompts.</span>
          </h1>

          <p className="animate-fade-up text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">
            Create structured, production-ready prompts for coding, studying,
            writing, research, and technical workflows. 100% free &amp; no account needed.
          </p>

          <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/generate" className="btn-primary text-sm min-h-[44px] flex items-center">
              <span>Generate Prompt</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link href="/explore" className="btn-secondary text-sm min-h-[44px] flex items-center">
              <span>Explore Library</span>
            </Link>
          </div>

          {/* About PromptForge & Creator Card */}
          <div className="animate-fade-up text-left max-w-3xl mx-auto">
            <div className="card p-6 sm:p-8 border border-theme bg-card relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative flex-shrink-0 group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-lg bg-card relative transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/suman-verse-logo.png"
                      alt="Suman Verse Logo"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-main tracking-tight">
                    About the Website &amp; <span className="text-accent">Suman Verse</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    <strong>PromptForge</strong> was engineered by <strong>Suman Verse</strong> to turn vague single-sentence queries into high-precision, production-ready AI directives. Grounded in senior domain authority, strict negative constraints, and structured output formatting.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <a
                      href="https://suman-verse.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs min-h-[38px] flex items-center"
                      style={{ padding: '7px 16px' }}
                    >
                      <Globe className="w-3.5 h-3.5 mr-1" />
                      <span>Visit Suman Verse</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <Link
                      href="/about"
                      className="btn-secondary text-xs min-h-[38px] flex items-center"
                      style={{ padding: '7px 16px' }}
                    >
                      <span>Read Philosophy &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section aria-label="How it works" className="bg-subtle border-y border-theme py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-main">
              How It Works
            </h2>
            <p className="text-muted text-sm sm:text-base">Three steps to a perfectly structured prompt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Describe', desc: 'Tell us what you are trying to accomplish in plain, conversational language.' },
              { num: '02', title: 'Configure', desc: 'Add domain parameters, context, constraints, and target output formats.' },
              { num: '03', title: 'Generate', desc: 'Get a scored prompt structured around your goal — ready to paste into any AI.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="card p-6 sm:p-8 text-center relative border border-theme">
                <div className="step-number mb-2">{num}</div>
                <h3 className="font-bold text-lg text-main mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Card */}
      <section aria-label="Features and benefits" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="card p-8 sm:p-10 relative overflow-hidden border border-theme bg-gradient-to-br from-card via-card to-subtle">
          <div className="relative z-10 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-main mb-2">
                Designed around better instructions
              </h2>
              <p className="text-muted text-sm sm:text-base max-w-2xl">
                Models perform significantly better when given role framing, explicit constraints,
                and clear objective definitions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-theme">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-accent" />, label: 'Clear', desc: 'Structured systematically around actual objectives without vague ambiguity.' },
                { icon: <Zap className="w-5 h-5 text-accent" />, label: 'Specific', desc: 'Domain context, technical dependencies, and output rules included upfront.' },
                { icon: <Sliders className="w-5 h-5 text-accent" />, label: 'Flexible', desc: 'Edit, shorten, expand, or optimize the generated prompt inside a live editor.' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-main mb-1">{label}</h3>
                    <p className="text-xs text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AEO / GEO FAQ Section */}
      <section aria-label="Frequently Asked Questions" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answer Engine Optimization &amp; FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted">
            Everything you need to know about prompt engineering, models, and quality scoring.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group card border border-theme rounded-xl overflow-hidden transition-all duration-200"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none text-main font-semibold text-sm sm:text-base hover:text-accent transition-colors">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-theme/60 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
