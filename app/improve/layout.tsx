import type { Metadata } from 'next';

const URL = 'https://promptforge.vercel.app/improve';

export const metadata: Metadata = {
  title: 'AI Prompt Optimizer — Refine & Score AI Prompts',
  description:
    'Paste any existing AI prompt and let PromptForge restructure it for clarity, specificity, and better AI responses. Free prompt optimizer for ChatGPT, Claude, Gemini, and DeepSeek.',
  keywords: [
    'prompt optimizer',
    'improve prompt',
    'prompt refiner',
    'AI prompt scorer',
    'optimize ChatGPT prompt',
    'Claude prompt enhancer',
    'anti-hallucination prompt tool',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'AI Prompt Optimizer — PromptForge',
    description:
      'Transform weak prompts into expert-grade instructions. Free optimizer for ChatGPT, Claude, Gemini, and DeepSeek.',
    url: URL,
    siteName: 'PromptForge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge AI Prompt Optimizer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Optimizer — PromptForge',
    description: 'Transform weak prompts into expert-grade instructions with automated scoring.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImproveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
