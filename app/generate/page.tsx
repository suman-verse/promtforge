'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SmartConfigForm } from '@/components/generator/SmartConfigForm';
import { PromptEditor } from '@/components/generator/PromptEditor';
import { GeneratedPromptResult, PromptGeneratorInput } from '@/lib/ai/promptEngine';
import { Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedPromptResult | null>(null);
  const [currentInput, setCurrentInput] = useState<PromptGeneratorInput | null>(null);

  const handleGenerate = async (data: PromptGeneratorInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentInput(data);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to generate prompt');
      }
      const json: GeneratedPromptResult = await res.json();
      setResult(json);
      setTimeout(() => {
        document.getElementById('prompt-result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Error generating prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = async (mode: 'shorten' | 'expand' | 'beginner' | 'expert') => {
    if (!result) return;
    setIsModifying(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: result.promptText,
          mode,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setResult({
          ...result,
          promptText: json.modifiedText,
          quality: json.quality || result.quality,
        });
      } else {
        throw new Error('AI modification failed');
      }
    } catch {
      // Fallback modification
      if (currentInput) {
        let modifiedGoal = currentInput.goal;
        let modifiedComplexity = currentInput.complexity;
        if (mode === 'shorten') modifiedGoal = `Concise version: ${currentInput.goal}`;
        else if (mode === 'expand') modifiedGoal = `Exhaustive comprehensive version: ${currentInput.goal}`;
        else if (mode === 'beginner') modifiedComplexity = 'Beginner / First-principles explanation';
        else if (mode === 'expert') modifiedComplexity = 'Principal / Senior Staff Architecture level';
        handleGenerate({ ...currentInput, goal: modifiedGoal, complexity: modifiedComplexity });
      }
    } finally {
      setIsModifying(false);
    }
  };

  const handleImprove = async () => {
    if (!result) return;
    setIsModifying(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawPrompt: result.promptText,
          options: { clarity: true, specificity: true, constraints: true, format: true },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setResult({
          ...result,
          promptText: json.improvedText,
          quality: { ...result.quality, score: Math.max(result.quality.score, json.score) },
        });
      }
    } catch {
      setErrorMessage('Failed to polish prompt with AI.');
    } finally {
      setIsModifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
            Prompt Generator
          </h1>
        </div>
        <p className="text-sm text-muted">
          Describe what you want to achieve. We engineer a structured, high-precision prompt ready for any AI model.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="card p-5 sm:p-6 shadow-md border border-theme bg-card">
        <SmartConfigForm
          onGenerate={handleGenerate}
          isLoading={isLoading}
          initialCategory={initialCategory}
        />
      </div>

      {result && (
        <div id="prompt-result-section" className="space-y-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-main tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              Engineered Prompt Result
            </h2>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-md border border-theme"
              style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
            >
              Engine: {result.model}
            </span>
          </div>
          <PromptEditor
            promptText={result.promptText}
            quality={result.quality}
            onTextChange={(newText) => setResult({ ...result, promptText: newText })}
            onRegenerate={() => currentInput && handleGenerate(currentInput)}
            onImprove={handleImprove}
            onModify={handleModify}
            isModifying={isModifying}
          />
        </div>
      )}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-6 py-16 text-center" style={{ color: 'var(--text-muted)' }}>
        Loading AI generator...
      </div>
    }>
      <GeneratorContent />
    </Suspense>
  );
}
