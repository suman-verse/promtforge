'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { PROMPT_TEMPLATES } from '@/data/templates';
import { PromptCard } from '@/components/prompt/PromptCard';
import {
  Sparkles, ArrowRight, Copy, Check, Code, BookOpen, PenLine,
  Search, TrendingUp, ShieldCheck, Zap, Sliders
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code:       <Code className="w-5 h-5 text-accent" />,
  BookOpen:   <BookOpen className="w-5 h-5 text-accent" />,
  PenLine:    <PenLine className="w-5 h-5 text-accent" />,
  Search:     <Search className="w-5 h-5 text-accent" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-accent" />,
};

export default function HomePage() {
  const [heroCopied, setHeroCopied] = useState(false);

  const heroPromptSample = `You are a Principal Software Engineer and System Architect.

OBJECTIVE:
Create a modern personal portfolio website for a frontend developer.

CONTEXT:
- Framework: Next.js + React + Tailwind CSS
- Goal: Production-ready, maintainable, performant component code

REQUIREMENTS:
1. Create a responsive navigation bar with theme switching.
2. Add a hero section featuring headline, subtitle, and primary call-to-action.
3. Build a project showcase grid with interactive cards.
4. Ensure full WCAG 2.1 AA accessibility compliance.

OUTPUT FORMAT:
Structured Markdown with clean TypeScript and React components.`;

  const handleHeroCopy = async () => {
    try {
      await navigator.clipboard.writeText(heroPromptSample);
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 1500);
    } catch {}
  };

  const featuredTemplates = PROMPT_TEMPLATES.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      <section className="hero-bg relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-20 text-center">
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
            writing, research, and technical workflows. 100% free &amp; offline.
          </p>

          <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/generate" className="btn-primary text-sm">
              <span>Generate Prompt</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/explore" className="btn-secondary text-sm">
              <span>Explore Library</span>
            </Link>
          </div>

          <div className="animate-fade-up text-left max-w-3xl mx-auto">
            <div className="card overflow-hidden shadow-lg border border-theme">
              <div className="flex items-center justify-between px-4 py-3 border-b border-theme bg-subtle">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted">example-prompt.md</span>
                </div>
                <button
                  onClick={handleHeroCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-theme bg-card hover:bg-subtle text-xs font-medium text-main transition-all"
                >
                  {heroCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="code-block p-5 text-xs sm:text-sm leading-relaxed rounded-none border-none overflow-x-auto whitespace-pre-wrap">
                {heroPromptSample}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-main">
            Built for the way you work
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
            Domain-specific prompt templates, tuned for each workflow and AI model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/generate?category=${cat.slug}`}
              className="card card-hover group p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center transition-transform group-hover:scale-110">
                  {ICON_MAP[cat.iconName] || <Sparkles className="w-5 h-5 text-accent" />}
                </div>
                <h3 className="font-semibold text-base text-main group-hover:text-accent transition-colors tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 flex items-center text-xs sm:text-sm font-semibold text-accent">
                <span>Start generating</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-subtle border-y border-theme py-16">
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-main">
              Featured Prompt Templates
            </h2>
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredTemplates.map((template) => (
            <PromptCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
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
                { icon: <Zap className="w-5 h-5 text-accent" />,         label: 'Specific', desc: 'Domain context, technical dependencies, and output rules included upfront.' },
                { icon: <Sliders className="w-5 h-5 text-accent" />,     label: 'Flexible', desc: 'Edit, shorten, expand, or optimize the generated prompt inside a live editor.' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-main mb-1">{label}</div>
                    <p className="text-xs text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
