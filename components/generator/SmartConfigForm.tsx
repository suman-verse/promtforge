'use client';

import React, { useState, type ReactNode, type FormEvent, type ChangeEvent } from 'react';
import { CATEGORIES } from '@/data/categories';
import { PromptGeneratorInput } from '@/lib/ai/promptEngine';
import {
  Code, BookOpen, PenLine, Search, TrendingUp, Megaphone,
  FileText, Sparkles, ChevronDown, ChevronUp,
} from 'lucide-react';

interface SmartConfigFormProps {
  onGenerate: (data: PromptGeneratorInput) => void;
  isLoading?: boolean;
  initialCategory?: string;
}

const ICON_MAP: Record<string, ReactNode> = {
  Code:       <Code className="w-4 h-4" />,
  BookOpen:   <BookOpen className="w-4 h-4" />,
  PenLine:    <PenLine className="w-4 h-4" />,
  Search:     <Search className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Megaphone:  <Megaphone className="w-4 h-4" />,
  FileText:   <FileText className="w-4 h-4" />,
};

const AI_MODELS = [
  'ChatGPT / GPT-4o',
  'Claude 3.5 Sonnet',
  'Gemini 1.5 Pro',
  'GitHub Copilot / Cursor',
  'General Assistant',
];

export function SmartConfigForm({ onGenerate, isLoading = false, initialCategory }: SmartConfigFormProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    initialCategory || CATEGORIES[0].slug
  );
  const [goal, setGoal] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [role, setRole] = useState('');
  const [constraints, setConstraints] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [tone, setTone] = useState('');

  const currentCategory = CATEGORIES.find((c) => c.slug === selectedCategorySlug) || CATEGORIES[0];

  const handleCategorySelect = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCustomFields({});
  };

  const handleCustomFieldChange = (key: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!goal.trim()) return;
    onGenerate({
      category: currentCategory.slug,
      goal,
      model: selectedModel,
      role: role || undefined,
      constraints: constraints || undefined,
      outputFormat: outputFormat || undefined,
      tone: tone || undefined,
      customFields,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          1. Select Workflow Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.slug === selectedCategorySlug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`p-3 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-accent bg-accent-light text-accent font-semibold shadow-xs ring-1 ring-accent/30'
                    : 'border-theme bg-subtle hover:bg-card text-muted hover:text-main'
                }`}
              >
                {ICON_MAP[cat.iconName] || <Sparkles className="w-4 h-4" />}
                <span className="text-xs truncate w-full">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          2. Describe your goal / objective
        </label>
        <textarea
          value={goal}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
          required
          rows={4}
          className="input-field font-sans text-sm resize-y leading-relaxed"
          placeholder={`Describe your goal in plain language...\nExample: "Build a responsive portfolio website with Next.js and Tailwind CSS."`}
        />
        <div className="flex flex-wrap gap-1.5 items-center pt-1">
          <span className="text-xs text-muted mr-1">Try:</span>
          {currentCategory.starterExamples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setGoal(ex)}
              className="text-xs px-2.5 py-1 rounded-lg border border-theme bg-subtle hover:bg-card text-muted hover:text-main hover:border-accent transition-colors truncate max-w-[280px]"
              title={ex}
            >
              &ldquo;{ex}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {currentCategory.fields.length > 0 && (
        <div className="space-y-4 rounded-xl p-5 border border-theme bg-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              3. Smart Configuration ({currentCategory.name})
            </span>
            <span className="text-[11px] text-muted font-mono">Tailored parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="block text-xs font-medium text-main">{field.label}</label>
                {field.type === 'select' && field.options ? (
                  <select
                    value={customFields[field.key] || ''}
                    onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                    className="input-field text-xs"
                  >
                    <option value="">Default / General</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={customFields[field.key] || ''}
                    onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder || ''}
                    className="input-field text-xs"
                  />
                )}
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-main">Target AI Engine</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="input-field text-xs"
              >
                {AI_MODELS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-theme pt-3">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-main transition-colors py-1"
        >
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{showAdvanced ? 'Hide advanced options' : 'Show advanced options (Role, Tone, Constraints)'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-theme bg-subtle animate-fade-in">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-main">Role Persona</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Staff Engineer, Academic Coach"
                className="input-field text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-main">Constraints</label>
              <input
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. Max 300 words, no external libraries"
                className="input-field text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-main">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">Default</option>
                <option value="Professional & Direct">Professional &amp; Direct</option>
                <option value="Academic & Rigorous">Academic &amp; Rigorous</option>
                <option value="Friendly & Engaging">Friendly &amp; Engaging</option>
                <option value="Concise & Punchy">Concise &amp; Punchy</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-main">Output Format</label>
              <input
                type="text"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                placeholder="e.g. Markdown Table, JSON, Code blocks"
                className="input-field text-xs"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !goal.trim()}
        className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isLoading ? 'Engineering prompt…' : 'Generate Structured Prompt'}</span>
      </button>
    </form>
  );
}
