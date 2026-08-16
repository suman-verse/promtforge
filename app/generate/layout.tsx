import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompt Generator — Create Structured Prompts Free',
  description:
    'Generate structured, expert-quality AI prompts for coding, writing, research, studying, and image generation. Select your mode, configure details, and get a ready-to-use prompt instantly.',
  alternates: { canonical: 'https://promptforge.vercel.app/generate' },
  openGraph: {
    title: 'AI Prompt Generator — PromptForge',
    description:
      'Create expert-quality AI prompts for ChatGPT, Claude, Gemini and more. 100% free and offline.',
    url: 'https://promptforge.vercel.app/generate',
  },
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
