'use client';

import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '@/data/templates';
import { CATEGORIES } from '@/data/categories';
import { PromptCard } from '@/components/prompt/PromptCard';
import { Search } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = PROMPT_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || template.categorySlug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-main">
          Prompt Library
        </h1>
        <p className="text-sm sm:text-base text-muted">
          Explore ready-to-use, high-scoring structured prompts for work, learning, and creative projects.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            name="q"
            aria-label="Search prompts by title, keyword, or workflow"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by title, keyword, or workflow..."
            className="input-field !pl-11 !pr-14 py-3 rounded-xl text-sm"
            style={{ paddingLeft: '44px', paddingRight: '56px' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-main"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'bg-card border border-theme text-muted hover:text-main hover:bg-subtle'
            }`}
          >
            All Prompts ({PROMPT_TEMPLATES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = PROMPT_TEMPLATES.filter((t) => t.categorySlug === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'bg-card border border-theme text-muted hover:text-main hover:bg-subtle'
                }`}
              >
                {cat.name} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
          {filteredTemplates.map((template) => (
            <PromptCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 card border border-dashed border-theme space-y-3">
          <div className="w-10 h-10 rounded-full bg-subtle mx-auto flex items-center justify-center text-muted">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-main">No matching prompts found</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Try adjusting your search query or filter, or use our generator to build a custom prompt.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-accent hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
