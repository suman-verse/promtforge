'use client';

import React, { useState } from 'react';
import { PromptEditor } from '@/components/generator/PromptEditor';
import { Sparkles, ArrowLeft, CheckCircle2, Wand2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ImprovePage() {
  const [rawPrompt, setRawPrompt] = useState('');
  const [options, setOptions] = useState({
    clarity: true,
    specificity: true,
    structure: true,
    context: true,
    constraints: true,
    format: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [improvedResult, setImprovedResult] = useState<{
    improvedText: string;
    score: number;
    changesMade: string[];
  } | null>(null);

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImprove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt, options }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to optimize prompt');
      }

      const json = await res.json();
      setImprovedResult(json);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Error optimizing prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-main mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Prompt Optimizer
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted">
          Paste any raw, messy, or basic prompt below. Our Prompt Refiner analyzes its weaknesses and rewrites it with professional personas, clear step-by-step logic, and strict anti-hallucination constraints.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleImprove} className="card p-6 sm:p-8 space-y-6 border border-theme">
        <div className="space-y-2">
          <label htmlFor="raw-prompt-input" className="block text-xs font-bold uppercase tracking-wider text-muted">
            Paste your original raw prompt
          </label>
          <textarea
            id="raw-prompt-input"
            name="rawPrompt"
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            required
            rows={5}
            className="input-field font-mono text-sm resize-y leading-relaxed"
            placeholder="Paste your prompt text here... (e.g. Write a python script to parse CSV files and compute average prices and create a chart)"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted">
            Select Optimization Dimensions
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { key: 'clarity', label: 'Clarity & Persona' },
              { key: 'specificity', label: 'Specificity & Edge Cases' },
              { key: 'structure', label: 'Structured Sections' },
              { key: 'context', label: 'Context & Specifications' },
              { key: 'constraints', label: 'Hard Constraints & Guardrails' },
              { key: 'format', label: 'Output Schema & Format' },
            ].map(({ key, label }) => {
              const checked = options[key as keyof typeof options];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggleOption(key as keyof typeof options)}
                  aria-pressed={checked}
                  className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    checked
                      ? 'border-accent bg-accent-light text-accent'
                      : 'border-theme bg-subtle text-muted hover:text-main'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${checked ? 'border-accent bg-accent text-white' : 'border-theme bg-card'}`}>
                    {checked ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !rawPrompt.trim()}
          className="btn-primary w-full sm:w-auto text-sm justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Refactoring prompt...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Optimize Prompt</span>
            </>
          )}
        </button>
      </form>

      {improvedResult && (
        <div className="space-y-6 pt-4 animate-fade-up">
          <div className="flex items-center justify-between border-b border-theme pb-3">
            <h2 className="text-xl font-bold text-main tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>AI Optimized Prompt Result</span>
            </h2>
            <span className="badge">
              Score: {improvedResult.score}/100
            </span>
          </div>

          <div className="p-4 rounded-xl border border-theme bg-subtle space-y-2">
            <h4 className="text-xs font-bold text-main uppercase tracking-wider">
              AI Enhancements Applied:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
              {improvedResult.changesMade.map((change, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>{change}</span>
                </div>
              ))}
            </div>
          </div>

          <PromptEditor
            promptText={improvedResult.improvedText}
            quality={{
              score: improvedResult.score,
              clarity: 96,
              specificity: 94,
              context: 92,
              constraints: 95,
              format: 96,
              suggestions: [],
            }}
            onTextChange={(newText) =>
              setImprovedResult({ ...improvedResult, improvedText: newText })
            }
          />
        </div>
      )}
    </div>
  );
}
