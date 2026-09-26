'use client';

import React, { useState } from 'react';
import { QualityMetrics } from '@/lib/ai/promptEngine';
import {
  Copy, Check, Edit2, Sparkles, RefreshCw,
  Maximize2, Minimize2, Zap, X, Loader2, Wand2, Eye, Code2
} from 'lucide-react';

interface PromptEditorProps {
  promptText: string;
  quality?: QualityMetrics;
  onTextChange?: (newText: string) => void;
  onRegenerate?: () => void;
  onImprove?: () => void;
  onModify?: (mode: 'shorten' | 'expand' | 'beginner' | 'expert') => void;
  isModifying?: boolean;
}

export function PromptEditor({
  promptText,
  quality,
  onTextChange,
  onRegenerate,
  onImprove,
  onModify,
  isModifying = false,
}: PromptEditorProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(promptText);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [viewTab, setViewTab] = useState<'preview' | 'raw'>('preview');
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
  const estimatedTokens = Math.round(charCount / 3.8);
  const score = quality?.score ?? 96;

  return (
    <div
      className={`card overflow-hidden transition-all duration-300 border border-theme relative ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col shadow-2xl bg-card' : ''
      }`}
    >
      {isModifying && (
        <div className="absolute inset-0 bg-card/75 backdrop-blur-xs z-20 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span className="text-sm font-semibold text-main">Refining prompt with AI...</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-theme bg-subtle">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Engineered Prompt Result
          </span>
          <span className="text-xs font-mono text-muted hidden sm:inline">
            · {wordCount} words · ~{estimatedTokens} tokens
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Tab Switcher */}
          {!isEditing && (
            <div className="flex items-center p-0.5 rounded-lg border border-theme bg-card">
              <button
                type="button"
                onClick={() => setViewTab('preview')}
                aria-pressed={viewTab === 'preview'}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  viewTab === 'preview'
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'text-muted hover:text-main'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Formatted</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('raw')}
                aria-pressed={viewTab === 'raw'}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  viewTab === 'raw'
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'text-muted hover:text-main'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Raw</span>
              </button>
            </div>
          )}

          {quality && (
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border border-accent/30 bg-accent-light text-accent transition-colors hover:bg-accent/20 cursor-pointer"
              aria-expanded={showBreakdown}
              aria-label={`Quality score ${score}/100 — click to ${showBreakdown ? 'hide' : 'show'} breakdown`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Score: {score}/100</span>
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-muted hover:text-main hover:bg-card border border-theme transition-colors cursor-pointer"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen view'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quality Breakdown Modal / Accordion */}
      {showBreakdown && quality && (
        <div className="px-5 py-4 border-b border-theme bg-subtle animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-main uppercase tracking-wider">
              Quality Evaluation Matrix
            </span>
            <button
              onClick={() => setShowBreakdown(false)}
              className="text-muted hover:text-main cursor-pointer"
              aria-label="Close quality breakdown"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { label: 'Clarity', val: quality.clarity },
              { label: 'Specificity', val: quality.specificity },
              { label: 'Context', val: quality.context },
              { label: 'Constraints', val: quality.constraints },
              { label: 'Output Schema', val: quality.format },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center border border-theme bg-card shadow-xs"
              >
                <div className="text-lg font-bold text-accent mb-0.5">{val}%</div>
                <div className="text-[10px] uppercase tracking-wide text-muted font-semibold">
                  {label}
                </div>
                <div className="w-full bg-subtle rounded-full h-1 mt-1.5 overflow-hidden border border-theme">
                  <div
                    className="bg-accent h-1 rounded-full transition-all duration-500"
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {quality.suggestions.length > 0 && (
            <div className="space-y-1 pt-1">
              {quality.suggestions.map((sug, i) => (
                <p key={i} className="text-xs text-muted">
                  <span className="font-semibold text-accent">Optimization Insight: </span>
                  {sug}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor Content Area */}
      <div className={`p-4 sm:p-5 ${isFullscreen ? 'flex-1 overflow-auto' : ''}`}>
        {isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={isFullscreen ? 22 : 14}
            className="w-full font-mono text-sm leading-relaxed resize-y outline-none rounded-xl p-4 border border-accent bg-input text-main ring-1 ring-accent/30"
          />
        ) : viewTab === 'raw' ? (
          <pre className="code-block p-4 sm:p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all rounded-xl border border-theme min-h-[220px]">
            {text}
          </pre>
        ) : (
          <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed rounded-xl border border-theme bg-card space-y-4 min-h-[220px] select-text">
            {text.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              const isHeader = /^[A-Z\s&]+:|^###?\s/m.test(trimmed);
              if (isHeader) {
                const lines = trimmed.split('\n');
                const headerLine = lines[0];
                const rest = lines.slice(1).join('\n');
                return (
                  <div key={idx} className="space-y-1.5 pb-2 border-b border-theme/60 last:border-0 last:pb-0">
                    <div className="text-xs font-bold text-accent uppercase tracking-wider font-mono">
                      {headerLine.replace(/###?\s/, '')}
                    </div>
                    {rest && (
                      <div className="text-main text-xs sm:text-sm whitespace-pre-wrap pl-1 font-sans">
                        {rest}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-main whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {trimmed}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Controls & Quick AI Modifiers */}
      <div className="px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-theme bg-subtle">
        {onModify && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-muted mr-1 hidden sm:inline">AI Adjust:</span>
            {[
              { mode: 'expert', label: 'Principal Tier' },
              { mode: 'expand', label: 'CoT Expand' },
              { mode: 'shorten', label: 'Dense Shorten' },
              { mode: 'beginner', label: 'Socratic Tutor' },
            ].map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => onModify(mode as 'shorten' | 'expand' | 'beginner' | 'expert')}
                disabled={isModifying}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle hover:border-accent text-muted hover:text-main transition-colors capitalize flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3 text-accent" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors cursor-pointer"
            aria-pressed={isEditing}
          >
            <Edit2 className="w-3.5 h-3.5 text-muted" />
            <span>{isEditing ? 'Done Editing' : 'Edit'}</span>
          </button>

          {onImprove && (
            <button
              onClick={onImprove}
              disabled={isModifying}
              aria-label="AI Polish — improve this prompt with AI"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>AI Polish</span>
            </button>
          )}

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isModifying}
              aria-label="Regenerate prompt"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-theme bg-card hover:bg-subtle text-main transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className="w-3.5 h-3.5 text-muted" />
              <span>Regenerate</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="btn-primary text-xs cursor-pointer shadow-md hover:shadow-lg"
            style={{ padding: '8px 18px', backgroundColor: copied ? '#10b981' : undefined }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard!</span>
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
