import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PromptForge — AI Prompt Engineering Tool',
    short_name: 'PromptForge',
    description: 'Create structured, production-ready AI prompts for ChatGPT, Claude, Gemini, and DeepSeek.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090a0f',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
