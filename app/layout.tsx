import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { DevToolsGuard } from '@/components/security/DevToolsGuard';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const BASE_URL = 'https://promptforge.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'PromptForge — AI Prompt Generator & Engineering Tool',
    template: '%s | PromptForge',
  },

  description:
    'Create structured, high-quality AI prompts for ChatGPT, Claude, Gemini, and Midjourney. Free, offline-ready prompt engineering tool for coding, writing, research, and image generation.',

  keywords: [
    'AI prompt generator',
    'prompt engineering',
    'ChatGPT prompts',
    'Claude prompts',
    'Gemini prompts',
    'Midjourney prompts',
    'AI prompts for coding',
    'AI writing prompts',
    'AI research prompts',
    'prompt optimizer',
    'free AI tools',
    'structured prompts',
    'prompt template',
    'AI productivity tool',
  ],

  authors: [
    { name: 'Suman Verse', url: 'https://suman-verse.vercel.app/' },
  ],

  creator: 'Suman Verse',
  publisher: 'PromptForge',

  category: 'technology',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/promptforge-logo.png', type: 'image/png' },
    ],
    shortcut: '/promptforge-logo.png',
    apple: '/promptforge-logo.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'PromptForge',
    title: 'PromptForge — AI Prompt Generator & Engineering Tool',
    description:
      'Create structured, high-quality AI prompts for ChatGPT, Claude, Gemini, and Midjourney. Free & offline.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptForge — AI Prompt Engineering Tool',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PromptForge — AI Prompt Generator & Engineering Tool',
    description:
      'Create structured, high-quality AI prompts for ChatGPT, Claude, Gemini, and Midjourney. Free & offline.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },

  alternates: {
    canonical: BASE_URL,
  },

  other: {
    'application-name': 'PromptForge',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'PromptForge',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#2563eb',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'PromptForge',
        description: 'AI Prompt Generator & Engineering Tool',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Suman Verse',
          url: 'https://suman-verse.vercel.app/',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/explore?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#app`,
        name: 'PromptForge',
        url: BASE_URL,
        description:
          'Free AI prompt engineering tool. Generate structured prompts for ChatGPT, Claude, Gemini, and Midjourney — coding, writing, research, and image generation.',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Person',
          name: 'Suman Verse',
          url: 'https://suman-verse.vercel.app/',
        },
        featureList: [
          'AI Prompt Generator',
          'Prompt Optimizer',
          'Prompt Library',
          'Offline-ready (no API key needed)',
          'ChatGPT / Claude / Gemini / Midjourney support',
        ],
      },
    ],
  };

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col transition-colors`}>
        <ThemeProvider>
          <DevToolsGuard />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
