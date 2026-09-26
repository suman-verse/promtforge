'use client';

import React, { useState, type ReactNode, type FormEvent, type ChangeEvent } from 'react';
import { CATEGORIES } from '@/data/categories';
import { PromptGeneratorInput } from '@/lib/ai/promptEngine';
import { AVAILABLE_AI_MODELS } from '@/lib/ai/openrouter';
import {
  Code, BookOpen, PenLine, Search, TrendingUp, Megaphone,
  FileText, Sparkles, ChevronDown, ChevronUp, Loader2, X,
  Brain, Layers, Zap
} from 'lucide-react';

interface SmartConfigFormProps {
  onGenerate: (data: PromptGeneratorInput) => void;
  isLoading?: boolean;
  initialCategory?: string;
}

const ICON_MAP: Record<string, ReactNode> = {
  Code:       <Code className="w-3.5 h-3.5" />,
  BookOpen:   <BookOpen className="w-3.5 h-3.5" />,
  PenLine:    <PenLine className="w-3.5 h-3.5" />,
  Search:     <Search className="w-3.5 h-3.5" />,
  TrendingUp: <TrendingUp className="w-3.5 h-3.5" />,
  Megaphone:  <Megaphone className="w-3.5 h-3.5" />,
  FileText:   <FileText className="w-3.5 h-3.5" />,
};

const PROMPT_ENHANCERS = [
  { id: 'no-placeholders', label: 'Zero Placeholders', directive: 'Strictly zero placeholders or truncated code blocks (no // TODO). Provide complete, unabridged solutions.' },
  { id: 'anti-hallucination', label: 'Anti-Hallucination', directive: 'Never invent unverified facts. State all implicit assumptions upfront.' },
  { id: 'strict-tests', label: 'Include Tests & Edge Cases', directive: 'Include verification test cases, assertions, and edge case hardening.' },
  { id: 'no-fluff', label: 'Zero Fluff', directive: 'Eliminate conversational pleasantries, introductory filler, and hedging.' },
];

const REASONING_MODES = [
  { id: 'principal', label: 'Principal Staff', icon: Layers },
  { id: 'cot', label: 'Chain-of-Thought', icon: Brain },
  { id: 'direct', label: 'Direct Execution', icon: Zap },
];

export function SmartConfigForm({ onGenerate, isLoading = false, initialCategory }: SmartConfigFormProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    initialCategory || CATEGORIES[0].slug
  );
  const [goal, setGoal] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_AI_MODELS[0].id);
  const [selectedMode, setSelectedMode] = useState(REASONING_MODES[0].id);
  const [activeEnhancers, setActiveEnhancers] = useState<string[]>([
    'no-placeholders',
    'no-fluff',
  ]);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [role, setRole] = useState('');
  const [constraints, setConstraints] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [tone, setTone] = useState('');

  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    if (initialCategory) {
      setSelectedCategorySlug(initialCategory);
    }
  }

  const currentCategory = CATEGORIES.find((c) => c.slug === selectedCategorySlug) || CATEGORIES[0];

  const handleCategorySelect = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCustomFields({});
  };

  const toggleEnhancer = (id: string) => {
    setActiveEnhancers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCustomFieldChange = (key: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!goal.trim()) return;

    const enhancerDirectives = PROMPT_ENHANCERS.filter((e) =>
      activeEnhancers.includes(e.id)
    )
      .map((e) => e.directive)
      .join(' ');

    const compiledConstraints = [constraints.trim(), enhancerDirectives]
      .filter(Boolean)
      .join('\n- ');

    const modeObj = REASONING_MODES.find((m) => m.id === selectedMode) || REASONING_MODES[0];

    onGenerate({
      category: currentCategory.slug,
      goal,
      model: selectedModel,
      role: role || undefined,
      constraints: compiledConstraints || undefined,
      outputFormat: outputFormat || undefined,
      tone: tone || undefined,
      complexity: modeObj.label,
      customFields,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category Pills (Compact horizontal wrap) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          Workflow Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.slug === selectedCategorySlug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-accent bg-accent-light text-accent font-semibold shadow-xs ring-1 ring-accent/30'
                    : 'border-theme bg-subtle hover:bg-card text-muted hover:text-main'
                }`}
              >
                {ICON_MAP[cat.iconName] || <Sparkles className="w-3 h-3" />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Goal Textarea (Clean, compact) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="goal-textarea" className="block text-xs font-bold uppercase tracking-wider text-muted">
            What do you want to accomplish?
          </label>
          {goal && (
            <button
              type="button"
              onClick={() => setGoal('')}
              aria-label="Clear goal text"
              className="text-xs text-muted hover:text-main flex items-center gap-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <textarea
          id="goal-textarea"
          name="goal"
          value={goal}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
          required
          rows={3}
          className="input-field font-sans text-sm resize-y leading-relaxed"
          placeholder={`Describe your goal in plain words...\nExample: "Write a high-performance Redis rate limiter in TypeScript with sliding window algorithm."`}
        />

        {/* Starter Chips */}
        <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
          <span className="text-[11px] text-muted mr-0.5">Examples:</span>
          {currentCategory.starterExamples.slice(0, 3).map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setGoal(ex)}
              className="text-[11px] px-2 py-0.5 rounded-md border border-theme bg-subtle hover:bg-card text-muted hover:text-main hover:border-accent transition-colors truncate max-w-[240px] cursor-pointer"
              title={ex}
            >
              &ldquo;{ex}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Compact Reasoning Mode Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          Reasoning Standard
        </label>
        <div className="grid grid-cols-3 gap-2">
          {REASONING_MODES.map((mode) => {
            const isSelected = mode.id === selectedMode;
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                aria-pressed={isSelected}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-accent bg-accent-light text-accent font-semibold shadow-xs ring-1 ring-accent/30'
                    : 'border-theme bg-subtle hover:bg-card text-muted hover:text-main'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Prompt Enhancers / Guardrails (1-click toggles) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted">
          Prompt Enhancers &amp; Directives
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PROMPT_ENHANCERS.map((enhancer) => {
            const isChecked = activeEnhancers.includes(enhancer.id);
            return (
              <button
                key={enhancer.id}
                type="button"
                onClick={() => toggleEnhancer(enhancer.id)}
                aria-pressed={isChecked}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isChecked
                    ? 'border-accent bg-accent-light text-accent font-semibold'
                    : 'border-theme bg-subtle text-muted hover:text-main'
                }`}
              >
                <span className="text-[11px] font-bold">{isChecked ? '✓' : '+'}</span>
                <span>{enhancer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Model & Dynamic Field Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-main">AI Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="input-field text-xs cursor-pointer"
          >
            {AVAILABLE_AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.badge || 'Frontier'})
              </option>
            ))}
          </select>
        </div>

        {currentCategory.fields.length > 0 ? (
          <div className="space-y-1">
            <label className="block text-xs font-medium text-main">
              {currentCategory.fields[0].label}
            </label>
            {currentCategory.fields[0].type === 'select' && currentCategory.fields[0].options ? (
              <select
                value={customFields[currentCategory.fields[0].key] || ''}
                onChange={(e) => handleCustomFieldChange(currentCategory.fields[0].key, e.target.value)}
                className="input-field text-xs cursor-pointer"
              >
                <option value="">Default / General</option>
                {currentCategory.fields[0].options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={customFields[currentCategory.fields[0].key] || ''}
                onChange={(e) => handleCustomFieldChange(currentCategory.fields[0].key, e.target.value)}
                placeholder={currentCategory.fields[0].placeholder || ''}
                className="input-field text-xs"
              />
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <label className="block text-xs font-medium text-main">Communication Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="input-field text-xs cursor-pointer"
            >
              <option value="">Default (Direct & Technical)</option>
              <option value="Authoritative & Pragmatic">Authoritative &amp; Pragmatic</option>
              <option value="Socratic & Pedagogical">Socratic &amp; Pedagogical</option>
              <option value="Executive & Strategic">Executive &amp; Strategic</option>
              <option value="Concise & Punchy">Concise &amp; Punchy</option>
            </select>
          </div>
        )}
      </div>

      {/* Advanced Accordion (Clean & compact) */}
      <div className="border-t border-theme pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-main transition-colors py-0.5 cursor-pointer"
        >
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{showAdvanced ? 'Hide advanced options' : 'More options (Persona, Custom Constraints, Output Format)'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-theme bg-subtle animate-fade-in">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-main">Custom Persona / Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Principal Systems Architect"
                className="input-field text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-main">Negative Constraints</label>
              <input
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. No third-party dependencies, max 200 words"
                className="input-field text-xs"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-medium text-main">Output Format</label>
              <input
                type="text"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                placeholder="e.g. Markdown Table, Complete TypeScript code blocks"
                className="input-field text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isLoading || !goal.trim()}
        className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Engineering prompt...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Generate Prompt</span>
          </div>
        )}
      </button>
    </form>
  );
}
