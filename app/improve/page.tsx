'use client';

import React, { useState } from 'react';
import { PromptEditor } from '@/components/generator/PromptEditor';
import { Sparkles, ArrowLeft, CheckCircle2, Wand2 } from 'lucide-react';
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
    try {
      const res = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt, options }),
      });

      if (res.ok) {
        const json = await res.json();
        setImprovedResult(json);
      }
    } catch {} finally {
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

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
          Improve an existing prompt
        </h1>
        <p className="text-sm sm:text-base text-muted">
          Paste any prompt below. We will optimize its clarity, persona framing, constraints, and output format.
        </p>
      </div>

      <form onSubmit={handleImprove} className="card p-6 sm:p-8 space-y-6 border border-theme">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted">
            Paste your original prompt
          </label>
          <textarea
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            required
            rows={5}
            className="input-field font-mono text-sm resize-y leading-relaxed"
            placeholder="Paste your prompt text here... (e.g. Write a python script to parse CSV files and compute average prices)"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted">
            Select Optimization Dimensions
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { key: 'clarity', label: 'Clarity & Persona' },
              { key: 'specificity', label: 'Specificity' },
              { key: 'structure', label: 'Structure & Flow' },
              { key: 'context', label: 'Context & Rules' },
              { key: 'constraints', label: 'Constraints & Safety' },
              { key: 'format', label: 'Output Format' },
            ].map(({ key, label }) => {
              const checked = options[key as keyof typeof options];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggleOption(key as keyof typeof options)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors ${
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
          className="btn-primary w-full sm:w-auto text-sm justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-4 h-4" />
          <span>{isLoading ? 'Optimizing Prompt...' : 'Optimize Prompt'}</span>
        </button>
      </form>

      {improvedResult && (
        <div className="space-y-6 pt-4 animate-fade-up">
          <div className="flex items-center justify-between border-b border-theme pb-3">
            <h2 className="text-xl font-bold text-main tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>Optimized Prompt Result</span>
            </h2>
            <span className="badge">
              Score: {improvedResult.score}/100
            </span>
          </div>

          <div className="p-4 rounded-xl border border-theme bg-subtle space-y-2">
            <h4 className="text-xs font-bold text-main uppercase tracking-wider">
              Optimizations Applied:
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
              clarity: 95,
              specificity: 92,
              context: 90,
              constraints: 94,
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
