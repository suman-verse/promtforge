# PromptForge

> **AI Prompt Generator & Precision Engineering Tool** — [promptforge.vercel.app](https://promptforge.vercel.app)

Turn raw ideas into structured, high-quality AI prompts for ChatGPT, Claude, Gemini, and DeepSeek. 100% free with no account or sign-up required.

---

## Features

- ⚡ **Multi-Tier Prompt Generator** — Configure role, task, context, and negative constraints to generate expert-level prompts.
- 🧠 **Frontier AI & Local Fallback** — Powered by OpenRouter (GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash, DeepSeek-R1) with automatic local deterministic engine fallback.
- 🔍 **Curated Prompt Library** — Production-tested prompts across Software Engineering, Education, Writing, Research, Business, Marketing, and Career.
- ✨ **Prompt Optimizer** — Paste any raw or weak prompt and get a structured, high-scoring version with automated quality scoring.
- 🌙 **Dark / Light Mode** — Seamless theme toggle with SSR hydration protection.
- 📱 **Mobile & Lighthouse 99+** — Strict accessibility standards, touch targets, SEO, AEO, and GEO optimization.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Components**: [React 19](https://react.dev/), [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript 5
- **Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/suman-verse/promtforge.git
cd "PROMT FORGE (PROMT GENERATOR)"
npm install
```

### 2. Configure Environment
Create a `.env.local` file (or copy `.env.example`):
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
SITE_URL=https://promptforge.vercel.app
SITE_NAME=PromptForge
```
*(Note: If no API key is set, PromptForge automatically uses its built-in deterministic prompt synthesis engine).*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Deploying to Vercel

1. Push your repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. In **Settings -> Environment Variables**, add:
   - `OPENROUTER_API_KEY` (from [openrouter.ai](https://openrouter.ai/keys))
   - `SITE_URL`: `https://your-domain.vercel.app`
4. Click **Deploy**.

---

## Project Structure

```
app/
├── (routes)/
│   ├── page.tsx               # Home & FAQ
│   ├── generate/              # Prompt generator
│   ├── explore/               # Prompt library
│   ├── improve/               # Prompt optimizer
│   ├── about/                 # About & philosophy
│   ├── categories/[slug]/     # SSG category pages
│   ├── prompts/[slug]/        # SSG prompt detail pages
│   ├── privacy/               # Privacy policy
│   ├── terms/                 # Terms of service
│   └── cookies/               # Cookie policy
├── api/                       # API endpoints (generate, improve, modify)
├── layout.tsx                 # Root layout, theme, metadata & JSON-LD
├── sitemap.ts                 # Dynamic sitemap (all 32+ routes)
├── robots.ts                  # Bot & AI crawler indexing rules
└── manifest.ts                # PWA manifest
components/
├── navbar/                    # Navbar & ThemeToggle
├── footer/                    # Footer & legal links
├── generator/                 # SmartConfigForm & PromptEditor
├── prompt/                    # PromptCard
└── security/                  # DevToolsGuard
lib/
└── ai/                        # OpenRouter integration & local engine
```

---

## Creator

Built by **Suman Verse** — [suman-verse.vercel.app](https://suman-verse.vercel.app/)
