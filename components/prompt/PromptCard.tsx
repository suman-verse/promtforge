'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PromptTemplate } from '@/data/templates';
import { ArrowRight, Copy, Check } from 'lucide-react';

interface PromptCardProps {
  template: PromptTemplate;
}

export function PromptCard({ template }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(template.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const formattedUsed =
    template.usedCount > 1000
      ? `${(template.usedCount / 1000).toFixed(1)}k`
      : template.usedCount;

  return (
    <div className="card card-hover group flex flex-col justify-between p-5 sm:p-6 gap-4">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="badge">{template.categoryName}</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-subtle text-muted border border-theme">
            {template.model.split(' ')[0]}
          </span>
        </div>

        <Link href={`/prompts/${template.slug}`}>
          <h3 className="font-semibold text-base text-main group-hover:text-accent transition-colors tracking-tight line-clamp-2 mb-2 leading-snug">
            {template.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs pt-4 border-t border-theme">
        <span className="font-mono text-muted">Used {formattedUsed}×</span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            aria-label={copied ? 'Prompt copied to clipboard' : `Copy ${template.title} prompt`}
            className="w-8 h-8 rounded-lg border border-theme bg-subtle hover:bg-card text-muted hover:text-main flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title="Copy prompt"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <Link
            href={`/prompts/${template.slug}`}
            className="flex items-center gap-1 font-medium text-muted group-hover:text-accent transition-colors min-h-[32px] px-1"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
