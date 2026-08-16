import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompt Optimizer — Improve & Refine Your Prompts',
  description:
    'Paste any existing AI prompt and let PromptForge restructure it for clarity, specificity, and better AI responses. Free prompt optimizer for ChatGPT, Claude, Gemini, and Midjourney.',
  alternates: { canonical: 'https://promptforge.vercel.app/improve' },
  openGraph: {
    title: 'AI Prompt Optimizer — PromptForge',
    description:
      'Transform weak prompts into expert-grade instructions. Free optimizer for ChatGPT, Claude, and Gemini.',
    url: 'https://promptforge.vercel.app/improve',
  },
};

export default function ImproveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
