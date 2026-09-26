import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { PROMPT_TEMPLATES } from '@/data/templates';
import { PromptCard } from '@/components/prompt/PromptCard';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    return { title: 'Category Not Found — PromptForge' };
  }

  const url = `https://promptforge.vercel.app/categories/${category.slug}`;

  return {
    title: `${category.name} AI Prompts & Engineering Templates — PromptForge`,
    description: category.description,
    keywords: [
      `${category.name} AI prompts`,
      `${category.name} prompt templates`,
      'prompt engineering',
      'ChatGPT prompts',
      'Claude prompts',
      'PromptForge',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} AI Prompts — PromptForge`,
      description: category.description,
      url,
      siteName: 'PromptForge',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${category.name} AI Prompts on PromptForge`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} AI Prompts — PromptForge`,
      description: category.description,
      images: ['/og-image.png'],
      creator: '@sumanverse',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryTemplates = PROMPT_TEMPLATES.filter((t) => t.categorySlug === category.slug);

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
        name: 'Categories',
        item: 'https://promptforge.vercel.app/explore',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://promptforge.vercel.app/categories/${category.slug}`,
      },
    ],
  };

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <header className="space-y-3 max-w-2xl">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-main transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Categories</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
          {category.name} AI Prompts
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2">
          <Link
            href={`/generate?category=${category.slug}`}
            className="btn-primary text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Custom {category.name} Prompt</span>
          </Link>
        </div>
      </header>

      <section aria-label={`${category.name} prompts list`} className="space-y-4">
        <h2 className="text-xl font-bold text-main tracking-tight">
          Curated {category.name} Prompts ({categoryTemplates.length})
        </h2>

        {categoryTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {categoryTemplates.map((template) => (
              <PromptCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl card border border-dashed border-theme text-center space-y-3">
            <p className="text-xs text-muted">
              No static templates saved for {category.name} yet.
            </p>
            <Link
              href={`/generate?category=${category.slug}`}
              className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              <span>Build one with the generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}
