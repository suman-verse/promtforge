export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  starterExamples: string[];
  fields: {
    key: string;
    label: string;
    type: 'select' | 'input' | 'textarea';
    placeholder?: string;
    options?: string[];
  }[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'coding',
    name: 'Coding',
    slug: 'coding',
    iconName: 'Code',
    description: 'Build cleaner code, debug errors, architect software, and automate unit testing.',
    starterExamples: [
      'Build a modern responsive portfolio website',
      'Refactor a React component to improve performance',
      'Design a RESTful API with Node.js and PostgreSQL',
      'Debug a memory leak in JavaScript async loop',
    ],
    fields: [
      { key: 'language', label: 'Programming Language', type: 'select', options: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL'] },
      { key: 'framework', label: 'Framework / Environment', type: 'input', placeholder: 'e.g. Next.js, React, Node.js, FastAPI' },
      { key: 'experience', label: 'Complexity Level', type: 'select', options: ['Beginner', 'Intermediate', 'Senior Engineer', 'Principal Architect'] },
      { key: 'constraints', label: 'Constraints & Rules', type: 'input', placeholder: 'e.g. No external dependencies, use strict types, zero telemetry' },
      { key: 'outputFormat', label: 'Output Format', type: 'select', options: ['Code + Explanation', 'Raw Code Only', 'Step-by-step tutorial', 'Diff format'] },
    ],
  },
  {
    id: 'studying',
    name: 'Studying',
    slug: 'studying',
    iconName: 'BookOpen',
    description: 'Deconstruct complex topics, create study plans, generate quizzes, and prepare for exams.',
    starterExamples: [
      'Explain quantum computing to a high school student',
      'Create a 4-week study roadmap for Calculus II',
      'Generate flashcards for biology cell structures',
      'Prepare practice exam questions for AP Physics',
    ],
    fields: [
      { key: 'subject', label: 'Subject / Discipline', type: 'input', placeholder: 'e.g. Computer Science, Organic Chemistry, World History' },
      { key: 'level', label: 'Current Level', type: 'select', options: ['High School', 'Undergraduate', 'Postgraduate', 'Self-taught beginner'] },
      { key: 'learningStyle', label: 'Learning Style', type: 'select', options: ['Socratic / QA', 'Analogy-focused', 'Bullet-point summary', 'Interactive quiz'] },
      { key: 'timeframe', label: 'Study Timeframe', type: 'input', placeholder: 'e.g. 2 weeks, 1 hour daily' },
    ],
  },
  {
    id: 'writing',
    name: 'Writing',
    slug: 'writing',
    iconName: 'PenLine',
    description: 'Craft compelling articles, refine essays, draft emails, and polish technical documentation.',
    starterExamples: [
      'Write an engaging intro for a tech blog post',
      'Draft a professional salary negotiation email',
      'Proofread and summarize an academic research paper',
      'Generate a YouTube video outline on technology trends',
    ],
    fields: [
      { key: 'contentType', label: 'Content Type', type: 'select', options: ['Blog Post', 'Email', 'Essay', 'Technical Doc', 'Social Media Post', 'YouTube Script'] },
      { key: 'audience', label: 'Target Audience', type: 'input', placeholder: 'e.g. Software engineers, C-suite executives, General public' },
      { key: 'tone', label: 'Tone of Voice', type: 'select', options: ['Professional & Direct', 'Friendly & Engaging', 'Academic & Objective', 'Persuasive & Bold'] },
      { key: 'length', label: 'Target Length', type: 'input', placeholder: 'e.g. 500 words, 3 short paragraphs' },
    ],
  },
  {
    id: 'research',
    name: 'Research',
    slug: 'research',
    iconName: 'Search',
    description: 'Analyze data, evaluate evidence, compare methodologies, and synthesize literature.',
    starterExamples: [
      'Synthesize key findings on renewable energy grid integration',
      'Compare PostgreSQL vs MongoDB for high-throughput analytics',
      'Draft a literature review outline on transformer architectures',
    ],
    fields: [
      { key: 'domain', label: 'Domain / Field', type: 'input', placeholder: 'e.g. Computer Science, Behavioral Economics' },
      { key: 'methodology', label: 'Preferred Approach', type: 'select', options: ['Comparative Analysis', 'Literature Review', 'Pros vs Cons Matrix', 'Historical Context'] },
      { key: 'outputFormat', label: 'Format', type: 'select', options: ['Executive Summary', 'Structured Markdown Report', 'Bullet Points', 'Table'] },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    slug: 'business',
    iconName: 'TrendingUp',
    description: 'Formulate strategy, construct SWOT analyses, structure project proposals, and draft briefs.',
    starterExamples: [
      'Create a SWOT analysis for a B2B SaaS startup',
      'Draft a client project proposal for custom software development',
      'Construct a customer persona for a productivity app',
    ],
    fields: [
      { key: 'industry', label: 'Industry', type: 'input', placeholder: 'e.g. FinTech, E-commerce, SaaS' },
      { key: 'objective', label: 'Primary Goal', type: 'input', placeholder: 'e.g. Increase conversion, outline Q4 strategy' },
      { key: 'format', label: 'Deliverable Type', type: 'select', options: ['Executive Summary', 'Actionable Roadmap', 'Matrix Table', 'Slide Outline'] },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    slug: 'marketing',
    iconName: 'Megaphone',
    description: 'Optimize SEO copy, write ad variations, plan content calendars, and write product descriptions.',
    starterExamples: [
      'Write 5 headline variations for a developer tool landing page',
      'Create a 2-week social media launch strategy',
      'Draft high-converting search copy for a web application',
    ],
    fields: [
      { key: 'platform', label: 'Platform / Channel', type: 'select', options: ['Google Ads', 'Twitter / X', 'LinkedIn', 'Landing Page', 'Email Newsletter'] },
      { key: 'targetAudience', label: 'Target Demographic', type: 'input', placeholder: 'e.g. Freelance designers, Tech founders' },
      { key: 'ctaGoal', label: 'Call To Action Goal', type: 'input', placeholder: 'e.g. Free trial signup, eBook download' },
    ],
  },
  {
    id: 'career',
    name: 'Career',
    slug: 'career',
    iconName: 'FileText',
    description: 'Enhance resume bullet points, tailor cover letters, prep for behavioral interviews, and optimize LinkedIn.',
    starterExamples: [
      'Transform software engineering bullet points into high-impact metric statements',
      'Generate technical interview practice questions for Senior React Developer role',
      'Write a compelling cover letter for a remote product manager position',
    ],
    fields: [
      { key: 'targetRole', label: 'Target Job Title', type: 'input', placeholder: 'e.g. Senior Frontend Developer, Data Scientist' },
      { key: 'companyType', label: 'Target Company', type: 'input', placeholder: 'e.g. Early-stage startup, Enterprise tech' },
      { key: 'focusArea', label: 'Focus Area', type: 'select', options: ['Resume Bullet Points', 'Cover Letter', 'Interview Q&A', 'LinkedIn Bio'] },
    ],
  },
];
