import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'PromptForge — AI Prompt Generator & Engineering Tool',
    template: '%s | PromptForge',
  },

  description:
    'Create structured, production-ready AI prompts for ChatGPT, Claude, Gemini, DeepSeek, and Midjourney. Precision prompt engineering tool for coding, writing, research, and technical workflows.',

  keywords: [
    'AI prompt generator',
    'prompt engineering',
    'ChatGPT prompts',
    'Claude prompts',
    'Gemini prompts',
    'DeepSeek prompts',
    'Midjourney prompts',
    'AI prompts for coding',
    'AI writing prompts',
    'AI research prompts',
    'prompt optimizer',
    'free AI tools',
    'structured prompts',
    'prompt template',
    'AI productivity tool',
    'prompt scoring',
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  manifest: '/manifest.webmanifest',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'PromptForge',
    title: 'PromptForge — AI Prompt Generator & Engineering Tool',
    description:
      'Create structured, high-quality AI prompts for ChatGPT, Claude, Gemini, DeepSeek, and Midjourney.',
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
      'Create structured, high-quality AI prompts for ChatGPT, Claude, Gemini, DeepSeek, and Midjourney.',
    images: ['/og-image.png'],
    creator: '@sumanverse',
  },

  alternates: {
    canonical: BASE_URL,
  },

  other: {
    'application-name': 'PromptForge',
    'apple-mobile-web-app-title': 'PromptForge',
    'format-detection': 'telephone=no',
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
        publisher: {
          '@type': 'Organization',
          name: 'PromptForge',
          url: BASE_URL,
          logo: `${BASE_URL}/promptforge-logo.png`,
          founder: {
            '@type': 'Person',
            name: 'Suman Verse',
            url: 'https://suman-verse.vercel.app/',
          },
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
        '@type': 'SoftwareApplication',
        '@id': `${BASE_URL}/#app`,
        name: 'PromptForge',
        url: BASE_URL,
        description:
          'Free AI prompt engineering tool. Generate structured prompts for ChatGPT, Claude, Gemini, DeepSeek, and Midjourney — coding, writing, research, and technical workflows.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Person',
          name: 'Suman Verse',
          url: 'https://suman-verse.vercel.app/',
        },
        featureList: [
          'AI Prompt Generator with multi-model targeting',
          'Prompt Optimizer & Refiner',
          'Searchable Prompt Library across 7 domains',
          'Multi-model support (GPT-4o, Claude 3.5 Sonnet, Gemini 2.0, DeepSeek-R1)',
          'Strict negative constraints & zero-placeholder enforcement',
          '5-metric Prompt Quality Score evaluation',
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${BASE_URL}/#howto`,
        name: 'How to Generate Structured AI Prompts with PromptForge',
        description: 'A 3-step method to turn vague ideas into high-scoring, production-ready AI directives.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Describe Your Goal',
            text: 'State what you are trying to accomplish in plain conversational language.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Configure Constraints and Target Model',
            text: 'Select your reasoning standard (Principal Staff, Chain-of-Thought, or Direct), target AI model, and guardrails like Zero Placeholders or Anti-Hallucination.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Generate and Refine',
            text: 'Receive a quality-scored prompt formatted with Role, Objective, Context, Requirements, and Output Format, ready to copy or adjust.',
          },
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
