'use client';

import React, { useState } from 'react';
import { QualityMetrics } from '@/lib/ai/promptEngine';
import {
  Copy, Check, Edit2, Sparkles, RefreshCw,
  Maximize2, Minimize2, Zap, X,
} from 'lucide-react';

interface PromptEditorProps {
  promptText: string;
  quality?: QualityMetrics;
  onTextChange?: (newText: string) => void;
  onRegenerate?: () => void;
  onImprove?: () => void;
  onModify?: (mode: 'shorten' | 'expand' | 'beginner' | 'expert') => void;
}

export function PromptEditor({
  promptText,
  quality,
  onTextChange,
  onRegenerate,
  onImprove,
  onModify,
}: PromptEditorProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(promptText);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [prevPromptText, setPrevPromptText] = useState(promptText);
  if (promptText !== prevPromptText) {
    setPrevPromptText(promptText);
    setText(promptText);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange?.(e.target.value);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const score = quality?.score ?? 0;

  return (
    <div
      className={`card overflow-hidden transition-all duration-300 border border-theme ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col shadow-2xl bg-card' : ''
      }`}
    >
      <div className="px-5 py-3.5 flex items-center justify-between gap-3 border-b border-theme bg-subtle">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
            Generated Output
          </span>
          <span className="text-xs font-mono text-muted hidden sm:inline">
            · {wordCount} words · {charCount} characters
          </span>
        </div>

        <div className="flex items-center gap-2">
          {quality && (
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border border-accent/30 bg-accent-light text-accent transition-colors hover:bg-accent/20"
              title="Click to view quality score breakdown"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Score: {score}/100</span>
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-muted hover:text-main hover:bg-card border border-theme transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen view'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {showBreakdown && quality && (
        <div className="px-5 py-4 border-b border-theme bg-subtle animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-main uppercase tracking-wider">Quality Metric Breakdown</span>
            <button
              onClick={() => setShowBreakdown(false)}
              className="text-muted hover:text-main"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { label: 'Clarity',     val: quality.clarity      },
              { label: 'Specificity', val: quality.specificity  },
              { label: 'Context',     val: quality.context      },
              { label: 'Constraints', val: quality.constraints  },
              { label: 'Format',      val: quality.format       },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center border border-theme bg-card"
              >
                <div className="text-lg font-bold text-accent mb-0.5">
                  {val}%
                </div>
                <div className="text-[10px] uppercase tracking-wide text-muted font-semibold">
                  {label}
                </div>
              </div>
            ))}
          </div>
          {quality.suggestions.length > 0 && (
            <p className="text-xs text-muted pt-1">
              <span className="font-semibold text-accent">Optimization Tip: </span>
              {quality.suggestions[0]}
            </p>
          )}
        </div>
      )}

      <div className={`p-4 sm:p-5 ${isFullscreen ? 'flex-1 overflow-auto' : ''}`}>
        {isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={isFullscreen ? 20 : 12}
            className="w-full font-mono text-sm leading-relaxed resize-y outline-none rounded-xl p-4 border border-accent bg-input text-main ring-1 ring-accent/30"
          />
        ) : (
          <pre className="code-block p-4 sm:p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all rounded-xl border border-theme min-h-[220px]">
            {text}
          </pre>
        )}
      </div>

      <div className="px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-theme bg-subtle">
        {onModify && (
          <div className="flex flex-wrap items-center gap-1.5">
            {(['shorten', 'expand', 'beginner', 'expert'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onModify(mode)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle hover:border-accent text-muted hover:text-main transition-colors capitalize"
              >
                {mode === 'beginner' ? 'Beginner' : mode === 'expert' ? 'Expert' : mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-muted" />
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>

          {onImprove && (
            <button
              onClick={onImprove}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Optimize</span>
            </button>
          )}

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-muted" />
              <span>Regenerate</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="btn-primary text-xs"
            style={{ padding: '8px 18px', backgroundColor: copied ? '#10b981' : undefined }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
