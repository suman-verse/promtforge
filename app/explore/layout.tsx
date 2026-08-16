import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore AI Prompt Library — Browse & Copy Prompts',
  description:
    'Browse 100+ curated AI prompts for coding, studying, writing, research, and image generation. Filter by category, search by keyword, and copy prompts instantly.',
  alternates: { canonical: 'https://promptforge.vercel.app/explore' },
  openGraph: {
    title: 'Explore AI Prompt Library — PromptForge',
    description:
      'Browse 100+ curated prompts for ChatGPT, Claude, Gemini & Midjourney. Filter, search, and copy instantly.',
    url: 'https://promptforge.vercel.app/explore',
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
