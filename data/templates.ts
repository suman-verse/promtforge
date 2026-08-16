export interface PromptTemplate {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  promptText: string;
  model: string;
  usedCount: number;
  qualityScore: number;
  tags: string[];
  howToUse: string;
  relatedSlugs: string[];
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'react-code-reviewer',
    slug: 'react-code-reviewer',
    title: 'React & TypeScript Code Reviewer',
    categorySlug: 'coding',
    categoryName: 'Coding',
    description: 'Perform a comprehensive code review on React components for performance leaks, state anti-patterns, and accessibility compliance.',
    model: 'ChatGPT / Claude / Copilot',
    usedCount: 1420,
    qualityScore: 96,
    tags: ['React', 'TypeScript', 'Code Review', 'Performance'],
    promptText: `You are a Principal Frontend Architect specializing in React 19, TypeScript, and web accessibility (WCAG 2.1 AA).

OBJECTIVE:
Conduct a rigorous code review of the provided React component. Identify performance bottlenecks, unnecessary re-renders, state anti-patterns, typing flaws, and missing accessibility attributes.

CONTEXT:
- Framework: React with TypeScript (strict mode)
- Goal: Production-ready, maintainable, performant component code

REQUIREMENTS:
1. Analyze component re-rendering triggers (inline object references, unmemoized callbacks).
2. Check hook dependency arrays for missing or unnecessary dependencies.
3. Validate accessibility (aria attributes, keyboard navigation, focus management).
4. Inspect type definitions for 'any' types, unsafe assertions, or missing prop validation.
5. Provide actionable refactored code alongside detailed bullet explanations.

OUTPUT FORMAT:
- Section 1: Executive Summary & Quality Score (1-100)
- Section 2: Critical Issues & Security / Anti-patterns
- Section 3: Recommended Refactored Component (Complete TypeScript code block)
- Section 4: Performance & Accessibility Benchmarks

[INSERT YOUR COMPONENT CODE HERE]`,
    howToUse: 'Copy the prompt text, replace [INSERT YOUR COMPONENT CODE HERE] with your actual React component code, and run it in ChatGPT or Claude.',
    relatedSlugs: ['javascript-debugging-assistant', 'api-architecture-designer'],
  },
  {
    id: 'javascript-debugging-assistant',
    slug: 'javascript-debugging-assistant',
    title: 'Root-Cause JavaScript & Node.js Debugger',
    categorySlug: 'coding',
    categoryName: 'Coding',
    description: 'Systematically diagnose runtime stack traces, memory leaks, and async race conditions without superficial patches.',
    model: 'ChatGPT / Claude / Cursor',
    usedCount: 980,
    qualityScore: 94,
    tags: ['JavaScript', 'Node.js', 'Debugging', 'Async'],
    promptText: `You are a Senior Systems Debugger specializing in JavaScript event loop internals, Node.js memory profiling, and async error diagnostics.

OBJECTIVE:
Investigate the provided error log / code snippet, isolate the exact root cause, and provide a permanent fix. Do not mask symptoms or swallow errors.

RULES & CONSTRAINTS:
1. Explain step-by-step why the error occurred in the execution timeline.
2. Fix the underlying contract or data flow, avoiding silent try/catch blocks.
3. Check upstream callers and downstream side-effects.

OUTPUT FORMAT:
- Root Cause Analysis: Concise explanation of what broke and why.
- The Surgical Fix: Exact modified code lines with inline rationale.
- Preventative Measure: Unit test suggestion to prevent regressions.

[PASTE ERROR STACK TRACE & CODE HERE]`,
    howToUse: 'Paste your un-truncated error log and the surrounding code function into the prompt placeholder before running.',
    relatedSlugs: ['react-code-reviewer', 'api-architecture-designer'],
  },
  {
    id: 'socratic-study-tutor',
    slug: 'socratic-study-tutor',
    title: 'Socratic Concept Explainer & Study Tutor',
    categorySlug: 'studying',
    categoryName: 'Studying',
    description: 'Master complex academic topics through guided questioning, clear mental models, and intuitive real-world analogies.',
    model: 'ChatGPT / Gemini / Claude',
    usedCount: 1850,
    qualityScore: 98,
    tags: ['Study', 'Socratic', 'Learning', 'Education'],
    promptText: `You are an expert Socratic Tutor and Cognitive Learning Specialist.

OBJECTIVE:
Help me deeply understand the concept of [INSERT TOPIC HERE] through intuitive mental models, real-world analogies, and progressive questioning.

TEACHING METHODOLOGY:
1. Start with an intuitive 2-sentence breakdown suitable for a beginner.
2. Provide a vivid real-world analogy to anchor the concept.
3. Break down the core mechanics into 3-4 structured principles.
4. Ask me 2 targeted checking questions to test my comprehension.
5. Do not move to advanced details until I answer the checking questions correctly.

TOPIC: [INSERT TOPIC HERE]
CURRENT LEVEL: [Beginner / Intermediate / Advanced]`,
    howToUse: 'Specify your study topic and current level in the bracketed placeholders to get a custom interactive study session.',
    relatedSlugs: ['exam-preparation-roadmap', 'academic-essay-refiner'],
  },
  {
    id: 'exam-preparation-roadmap',
    slug: 'exam-preparation-roadmap',
    title: 'Structured Exam & Revision Roadmap',
    categorySlug: 'studying',
    categoryName: 'Studying',
    description: 'Generate high-yield revision timetables, topic prioritization matrices, and active recall practice schedules.',
    model: 'ChatGPT / Gemini',
    usedCount: 760,
    qualityScore: 92,
    tags: ['Exam Prep', 'Study Plan', 'Active Recall'],
    promptText: `You are an Academic Coach specializing in spaced repetition and high-yield exam preparation.

OBJECTIVE:
Construct an actionable, day-by-day revision schedule and active recall strategy for my upcoming exam.

INPUT DATA:
- Subject / Exam: [INSERT EXAM NAME]
- Days Remaining: [INSERT NUMBER OF DAYS]
- Daily Available Time: [INSERT HOURS PER DAY]
- Weakest Topics: [LIST TOPICS HERE]

REQUIREMENTS:
1. Group syllabus into High-Yield vs Low-Yield topics.
2. Apply spaced repetition intervals (Day 1, Day 3, Day 7 reviews).
3. Include active recall prompts for key formulas or concepts.
4. Allocate mock test review buffers.

OUTPUT: Markdown table schedule + Active Recall Checklist.`,
    howToUse: 'Fill in your exam name, days remaining, and study time to receive a personalized day-by-day plan.',
    relatedSlugs: ['socratic-study-tutor'],
  },
  {
    id: 'technical-blog-writer',
    slug: 'technical-blog-writer',
    title: 'High-Authority Technical Blog Writer',
    categorySlug: 'writing',
    categoryName: 'Writing',
    description: 'Produce engaging, authoritative software development articles with clear code snippets and punchy headings.',
    model: 'Claude / ChatGPT',
    usedCount: 1120,
    qualityScore: 95,
    tags: ['Blogging', 'Technical Writing', 'SEO', 'Software'],
    promptText: `You are a Principal Tech Writer and Staff Software Engineer authoring articles for major engineering publications (e.g. Martin Fowler, Stripe Engineering Blog).

OBJECTIVE:
Write an authoritative 1,200-word technical blog post about [INSERT TOPIC HERE].

STYLE & STRUCTURE:
1. Hook the reader in paragraph 1 with a relatable engineering problem.
2. Include an 'Architecture Breakdown' section with clear markdown diagrams or bullet points.
3. Provide idiomatic code examples with syntax highlighting and inline commentary.
4. Add a 'Common Pitfalls & Tradeoffs' section comparing alternative approaches.
5. End with an actionable conclusion and takeaway summary.

TONE: Authoritative, pragmatic, concise. No filler jargon.

TOPIC: [INSERT TOPIC HERE]`,
    howToUse: 'Replace [INSERT TOPIC HERE] with your target article topic.',
    relatedSlugs: ['react-code-reviewer', 'socratic-study-tutor'],
  },
  {
    id: 'api-architecture-designer',
    slug: 'api-architecture-designer',
    title: 'RESTful API & Database Architecture Planner',
    categorySlug: 'coding',
    categoryName: 'Coding',
    description: 'Design robust database schemas, REST endpoints, error payload structures, and indexing strategies.',
    model: 'ChatGPT / Claude',
    usedCount: 890,
    qualityScore: 96,
    tags: ['Backend', 'API', 'PostgreSQL', 'Architecture'],
    promptText: `You are a Principal Backend & Database Architect.

OBJECTIVE:
Design a production-grade RESTful API specification and PostgreSQL relational database schema for [INSERT FEATURE / APPLICATION].

DELIVERABLES:
1. Entity-Relationship Schema (PostgreSQL DDL SQL with foreign keys, constraints, and indexes).
2. API Endpoint Table (Method, Path, Request Body, Response Status Codes, Description).
3. Standardized JSON Error Payload Format.
4. Security & Authentication Requirements (JWT, Rate Limiting, RLS).

SYSTEM PURPOSE: [INSERT APPLICATION DESCRIPTION]`,
    howToUse: 'Insert your application concept to get a full backend specification with SQL tables and API routes.',
    relatedSlugs: ['react-code-reviewer', 'javascript-debugging-assistant'],
  },
];
