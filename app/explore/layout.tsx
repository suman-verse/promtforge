import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/explore';

export const metadata: Metadata = {
  title: 'Explore AI Prompt Library — Search & Copy Prompts',
  description:
    'Browse 100+ curated AI prompts for coding, studying, writing, research, and technical workflows. Filter by category, search by keyword, and copy prompts instantly.',
  keywords: [
    'prompt library',
    'AI prompt templates',
    'free ChatGPT prompts',
    'Claude prompts library',
    'developer prompts',
    'coding prompt templates',
    'study prompts',
    'research prompts',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Explore AI Prompt Library — PromptForge',
    description:
      'Browse 100+ curated prompts for ChatGPT, Claude, Gemini & DeepSeek. Filter, search, and copy instantly.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge Curated Prompt Library',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore AI Prompt Library — PromptForge',
    description: 'Browse 100+ curated prompts for ChatGPT, Claude, Gemini & DeepSeek.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
