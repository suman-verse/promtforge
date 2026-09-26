import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ExternalLink, Globe, Shield, Terminal, Zap, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/about';

export const metadata: Metadata = {
  title: 'About PromptForge — Prompt Engineering Philosophy & Creator',
  description:
    'Learn about PromptForge — engineered by Suman Verse. Discover why structured AI prompts outperform vague requests and how PromptForge turns ideas into high-scoring AI instructions.',
  keywords: [
    'about PromptForge',
    'Suman Verse',
    'prompt engineering philosophy',
    'structured prompts methodology',
    'AI prompt quality standards',
    'AI prompt architecture',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'About PromptForge — Prompt Engineering Philosophy',
    description:
      'Discover the philosophy behind PromptForge and why structured AI prompts produce dramatically better results.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About PromptForge & Suman Verse',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PromptForge — Prompt Engineering Philosophy',
    description: 'The philosophy and architecture behind PromptForge, built by Suman Verse.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const pillars = [
    {
      num: '01',
      title: 'Persona & Role Framing',
      desc: 'Framing the model with senior domain authority grounds its tone, depth, and analytical precision.',
      icon: <Terminal className="w-4 h-4 text-accent" />,
    },
    {
      num: '02',
      title: 'Unambiguous Objective',
      desc: 'Direct, declarative task definition that eliminates speculative tangents and hallucinations.',
      icon: <Zap className="w-4 h-4 text-accent" />,
    },
    {
      num: '03',
      title: 'Rich Domain Context',
      desc: 'Stack details, environment variables, target audience, and architecture constraints upfront.',
      icon: <Layers className="w-4 h-4 text-accent" />,
    },
    {
      num: '04',
      title: 'Negative Constraints',
      desc: 'Strict boundary rules declaring what the AI must NOT do (e.g. no fluff, zero unnecessary deps).',
      icon: <Shield className="w-4 h-4 text-accent" />,
    },
    {
      num: '05',
      title: 'Output Schema & Format',
      desc: 'Explicitly specifying TypeScript interfaces, Markdown tables, or clean code blocks with no conversational filler.',
      icon: <BookOpen className="w-4 h-4 text-accent" />,
    },
    {
      num: '06',
      title: 'Comprehension & Verification',
      desc: 'Self-checking criteria and scoring to ensure high output quality every single time.',
      icon: <CheckCircle2 className="w-4 h-4 text-accent" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-main leading-tight">
          Designed around <span className="text-accent">better instructions</span>
        </h1>
        <p className="text-base text-muted leading-relaxed">
          PromptForge was built to solve a fundamental problem: users know what they want AI to do, but lack the structural framework to communicate it effectively.
        </p>
      </div>

      <div className="card p-6 sm:p-8 space-y-3">
        <h2 className="text-xl font-bold text-main tracking-tight">
          The Problem with Raw Prompts
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          When users type single-sentence instructions like <em className="text-main font-medium">&ldquo;Make me a portfolio website&rdquo;</em> or <em className="text-main font-medium">&ldquo;Explain quantum physics&rdquo;</em>, large language models are forced to guess context, assumptions, constraints, and target formatting. This leads to generic, repetitive, or incomplete answers.
        </p>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-main">
            The 6 Pillars of Prompt Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="card p-5 space-y-3 flex flex-col justify-between hover:border-accent transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-muted">{pillar.num}</span>
                </div>
                <h3 className="font-semibold text-sm text-main">{pillar.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative flex-shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-lg bg-card relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/suman-verse-logo.png"
                alt="Suman Verse Logo"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight">
              Made by <span className="text-accent">Suman Verse</span>
            </h2>
            <p className="text-xs font-mono text-muted uppercase tracking-widest">
              CODE. DESIGN. INSPIRE.
            </p>
            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
              PromptForge is designed, engineered, and maintained by <strong>Suman Verse</strong>. Built with a strict focus on surgical code, zero fluff, clean editorial aesthetics, and high-performance prompt engineering architectures.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="https://suman-verse.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
                style={{ padding: '8px 18px' }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Portfolio</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8 text-center space-y-4 bg-subtle">
        <h2 className="text-2xl font-bold text-main">
          Ready to engineer better prompts?
        </h2>
        <p className="text-xs text-muted max-w-md mx-auto">
          Start generating structured AI prompts for your projects now.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/generate" className="btn-primary text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Prompt Generator</span>
          </Link>
          <Link href="/explore" className="btn-secondary text-xs">
            Browse Prompt Library
          </Link>
        </div>
      </div>
    </div>
  );
}
