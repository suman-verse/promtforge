# PromptForge

> **AI Prompt Generator & Engineering Tool** — [promptforge.vercel.app](https://promptforge.vercel.app)

Turn raw ideas into structured, high-quality AI prompts for ChatGPT, Claude, Gemini, and Midjourney. 100% free, offline-ready, no API key required.

---

## Features

- ⚡ **Prompt Generator** — Configure role, task, context, and constraints to generate expert-level prompts
- 🔍 **Prompt Library** — Browse 100+ curated prompts across coding, writing, research, and image generation
- ✨ **Prompt Optimizer** — Paste any weak prompt and get a structured, high-scoring version
- 🌙 **Dark / Light Mode** — Theme toggle with system preference detection
- 📴 **No API Key** — 100% deterministic, runs in-browser

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- TypeScript 5

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/promptforge)

```bash
# Clone and install
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

---

## Project Structure

```
app/
├── page.tsx          # Home / landing
├── generate/         # Prompt generator
├── explore/          # Prompt library
├── improve/          # Prompt optimizer
├── about/            # About & philosophy
├── categories/       # Category pages
├── sitemap.ts        # Auto-generated sitemap
├── robots.ts         # robots.txt
└── layout.tsx        # Root layout + SEO metadata

components/
├── navbar/           # Navbar + ThemeToggle
├── footer/           # Footer
├── generator/        # SmartConfigForm + PromptEditor
└── prompt/           # PromptCard

data/
├── templates.ts      # Prompt templates
└── categories.ts     # Category definitions

lib/
└── ai/promptEngine.ts  # Core prompt generation logic
```

---

## Made by

**Suman Verse** — [suman-verse.vercel.app](https://suman-verse.vercel.app/)
