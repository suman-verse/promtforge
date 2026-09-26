'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/generate', label: 'Generate' },
    { href: '/explore', label: 'Explore' },
    { href: '/improve', label: 'Improve' },
    { href: '/about', label: 'About' },
  ];

  const active = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-card border-b border-theme shadow-sm'
          : 'bg-transparent border-b border-transparent'
        }`}
      style={{ backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="w-7 h-7 flex-shrink-0 relative transition-transform group-hover:scale-105">
            <Image
              src="/promptforge-logo.png"
              alt="PromptForge Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-base tracking-tight text-main">
            Prompt<span className="text-accent">Forge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${active(link.href)
                  ? 'text-accent bg-accent-light font-semibold'
                  : 'text-muted hover:text-main hover:bg-subtle'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/generate" className="btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>
            Create Prompt
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 min-h-[44px] min-w-[44px] rounded-lg text-muted hover:text-main transition-colors flex items-center justify-center cursor-pointer"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="md:hidden px-6 py-4 flex flex-col gap-1 border-t border-theme bg-card animate-fade-up">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors min-h-[44px] flex items-center ${active(link.href)
                  ? 'text-accent bg-accent-light'
                  : 'text-muted hover:text-main hover:bg-subtle'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-theme">
            <Link
              href="/generate"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center min-h-[44px] flex items-center"
              style={{ fontSize: '14px' }}
            >
              Create Prompt
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
