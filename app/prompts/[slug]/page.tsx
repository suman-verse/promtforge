import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROMPT_TEMPLATES } from '@/data/templates';
import { PromptCard } from '@/components/prompt/PromptCard';
import { ArrowLeft, Zap, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface PromptDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROMPT_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PromptDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const template = PROMPT_TEMPLATES.find((t) => t.slug === resolvedParams.slug);

  if (!template) {
    return {
      title: 'Prompt Not Found — PromptForge',
    };
  }

  const url = `https://promptforge.vercel.app/prompts/${template.slug}`;

  return {
    title: `${template.title} — AI Prompt Template | PromptForge`,
    description: template.description,
    keywords: [
      template.title,
      `${template.categoryName} prompt`,
      template.model,
      ...template.tags,
      'prompt engineering',
      'AI prompt template',
      'ChatGPT prompt',
      'Claude prompt',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${template.title} — AI Prompt | PromptForge`,
      description: template.description,
      url,
      siteName: 'PromptForge',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${template.title} AI prompt`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.title} — AI Prompt | PromptForge`,
      description: template.description,
      images: ['/og-image.png'],
      creator: '@sumanverse',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
  const resolvedParams = await params;
  const template = PROMPT_TEMPLATES.find((t) => t.slug === resolvedParams.slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = PROMPT_TEMPLATES.filter(
    (t) => template.relatedSlugs.includes(t.slug) || (t.categorySlug === template.categorySlug && t.id !== template.id)
  ).slice(0, 2);

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://promptforge.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prompt Library',
        item: 'https://promptforge.vercel.app/explore',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: template.categoryName,
        item: `https://promptforge.vercel.app/categories/${template.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: template.title,
        item: `https://promptforge.vercel.app/prompts/${template.slug}`,
      },
    ],
  };

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: template.title,
    description: template.description,
    text: template.promptText,
    creator: {
      '@type': 'Organization',
      name: 'PromptForge',
      url: 'https://promptforge.vercel.app',
    },
    keywords: template.tags.join(', '),
    educationalUse: 'Prompt Engineering',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />

      <nav aria-label="Breadcrumb navigation" className="space-y-3">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-main transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Library</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link href="/explore" className="text-muted hover:text-main">
            Prompt Library
          </Link>
          <span className="text-muted">/</span>
          <Link href={`/categories/${template.categorySlug}`} className="text-accent font-semibold hover:underline">
            {template.categoryName}
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main leading-tight">
          {template.title}
        </h1>

        <p className="text-base text-muted max-w-2xl leading-relaxed">
          {template.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="badge">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Score: {template.qualityScore}/100</span>
          </span>
          <span className="text-xs text-muted font-mono bg-subtle px-2.5 py-1 rounded-md border border-theme">
            Target: {template.model}
          </span>
          <span className="text-xs text-muted font-mono">
            Used {template.usedCount} times
          </span>
        </div>
      </nav>

      <section aria-label="Prompt content" className="card overflow-hidden border border-theme">
        <div className="px-4 py-3 bg-subtle border-b border-theme flex items-center justify-between">
          <span className="text-xs font-mono text-muted uppercase tracking-wider font-semibold">
            Copyable Prompt Text
          </span>
          <span className="text-xs text-muted font-mono hidden sm:inline">
            Optimized for {template.model}
          </span>
        </div>

        <pre className="code-block p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all rounded-none border-none">
          {template.promptText}
        </pre>
      </section>

      <section aria-label="Usage guide" className="card p-6 border border-theme bg-subtle space-y-2.5">
        <h2 className="text-sm font-bold text-main flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span>How to use this prompt</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          {template.howToUse}
        </p>
      </section>

      {relatedTemplates.length > 0 && (
        <section aria-label="Related prompt templates" className="space-y-4 pt-6 border-t border-theme">
          <h2 className="text-lg font-bold text-main tracking-tight">
            Related Prompts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTemplates.map((rel) => (
              <PromptCard key={rel.id} template={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
