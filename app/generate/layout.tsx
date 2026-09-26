import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/generate';

export const metadata: Metadata = {
  title: 'AI Prompt Generator — Create Structured Prompts Free',
  description:
    'Generate structured, expert-quality AI prompts for coding, writing, research, studying, and technical workflows. Select your mode, configure constraints, and get a ready-to-use prompt instantly.',
  keywords: [
    'AI prompt generator',
    'free prompt generator',
    'system prompt creator',
    'ChatGPT prompt generator',
    'Claude prompt generator',
    'DeepSeek prompt engineering',
    'structured AI instructions',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'AI Prompt Generator — PromptForge',
    description:
      'Create expert-quality AI prompts for ChatGPT, Claude, Gemini, DeepSeek, and more. 100% free with no account needed.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge AI Prompt Generator',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Generator — PromptForge',
    description: 'Create expert-quality AI prompts for ChatGPT, Claude, Gemini, and DeepSeek.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
