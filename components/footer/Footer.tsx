import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-theme bg-subtle py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 flex-shrink-0 relative transition-transform group-hover:scale-105">
              <Image
                src="/promptforge-logo.png"
                alt="PromptForge Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-main">
              Prompt<span className="text-accent">Forge</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xs">
            A precision developer tool for structuring clear, high-scoring AI instructions. 100% free &amp; no account needed.
          </p>
          <div className="pt-1 flex items-center gap-3">
            <a
              href="https://suman-verse.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-theme bg-card hover:bg-subtle text-xs font-semibold text-main transition-colors group shadow-xs"
            >
              <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0">
                <Image
                  src="/suman-verse-logo.png"
                  alt="Suman Verse"
                  width={16}
                  height={16}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Made by</span>
              <strong className="text-accent font-semibold group-hover:underline">Suman Verse</strong>
              <span className="text-muted text-[10px]">↗</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-main mb-4">
            Product
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
            <li>
              <Link href="/generate" className="hover:text-accent transition-colors">
                Prompt Generator
              </Link>
            </li>
            <li>
              <Link href="/improve" className="hover:text-accent transition-colors">
                Prompt Optimizer
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-accent transition-colors">
                Prompt Library
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-main mb-4">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
            <li>
              <Link href="/categories/coding" className="hover:text-accent transition-colors">
                Software Engineering
              </Link>
            </li>
            <li>
              <Link href="/categories/studying" className="hover:text-accent transition-colors">
                Education &amp; Study
              </Link>
            </li>
            <li>
              <Link href="/categories/writing" className="hover:text-accent transition-colors">
                Writing &amp; Content
              </Link>
            </li>
            <li>
              <Link href="/categories/research" className="hover:text-accent transition-colors">
                Research &amp; Analysis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-main mb-4">
            Creator &amp; Company
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-accent transition-colors">
                About &amp; Philosophy
              </Link>
            </li>
            <li>
              <a
                href="https://suman-verse.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-1"
              >
                <span>Suman Verse Portfolio</span>
                <span className="text-[10px]">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal footer bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-theme flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">© 2026 PromptForge. All rights reserved.</p>
        <nav aria-label="Legal links" className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
        </nav>
      </div>
    </footer>
  );
}

