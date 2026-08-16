export interface PromptGeneratorInput {
  category: string;
  goal: string;
  model?: string;
  role?: string;
  context?: string;
  constraints?: string;
  outputFormat?: string;
  tone?: string;
  complexity?: string;
  customFields?: Record<string, string>;
}

export interface QualityMetrics {
  score: number;
  clarity: number;
  specificity: number;
  context: number;
  constraints: number;
  format: number;
  suggestions: string[];
}

export interface GeneratedPromptResult {
  promptText: string;
  quality: QualityMetrics;
  category: string;
  model: string;
}

export function generateStructuredPrompt(input: PromptGeneratorInput): GeneratedPromptResult {
  const {
    category = 'general',
    goal,
    model = 'ChatGPT / General AI',
    role,
    context,
    constraints,
    outputFormat,
    tone,
    complexity,
    customFields = {},
  } = input;

  const sections: string[] = [];

  let assignedRole = role;
  if (!assignedRole) {
    switch (category) {
      case 'coding':
        assignedRole = `Principal Software Engineer and System Architect`;
        break;
      case 'studying':
        assignedRole = `Socratic Academic Tutor and Cognitive Learning Specialist`;
        break;
      case 'writing':
        assignedRole = `Senior Technical Writer and Editorial Specialist`;
        break;
      case 'research':
        assignedRole = `Principal Research Analyst and Literature Synthesizer`;
        break;
      case 'business':
        assignedRole = `Senior Management Consultant and Business Strategist`;
        break;
      case 'marketing':
        assignedRole = `Lead Conversion Copywriter and Growth Marketer`;
        break;
      case 'career':
        assignedRole = `Executive Career Coach and Talent Acquisition Strategist`;
        break;
      default:
        assignedRole = `Expert Domain Specialist`;
    }
  }

  sections.push(`ROLE:\nYou are an experienced ${assignedRole}.`);
  sections.push(`OBJECTIVE:\n${goal.trim()}`);

  const contextParts: string[] = [];
  if (context && context.trim()) {
    contextParts.push(context.trim());
  }
  if (model) {
    contextParts.push(`Target Engine: ${model}`);
  }
  if (complexity) {
    contextParts.push(`Target Complexity Level: ${complexity}`);
  }
  if (tone) {
    contextParts.push(`Communication Tone: ${tone}`);
  }
  Object.entries(customFields).forEach(([key, val]) => {
    if (val && val.trim()) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      contextParts.push(`${formattedKey}: ${val.trim()}`);
    }
  });

  if (contextParts.length > 0) {
    sections.push(`CONTEXT & SPECIFICATIONS:\n- ${contextParts.join('\n- ')}`);
  }

  const reqs: string[] = [];
  if (category === 'coding') {
    reqs.push('Write clean, idiomatic code adhering to best industry standards.');
    reqs.push('Avoid unrequested abstractions or third-party package dependencies.');
    reqs.push('Provide exact code blocks with syntax highlighting.');
    reqs.push('Explain the underlying architecture and key decisions concisely.');
  } else if (category === 'studying') {
    reqs.push('Break down complex concepts into intuitive mental models.');
    reqs.push('Use practical analogies to anchor difficult topics.');
    reqs.push('Include 2-3 interactive comprehension check questions.');
  } else if (category === 'writing') {
    reqs.push('Ensure strong visual hierarchy with clear headings and bullet points.');
    reqs.push('Eliminate passive voice, fluff, and unnecessary filler words.');
    reqs.push('Tailor vocabulary precisely to the target audience.');
  } else {
    reqs.push('Structure your response logically with clear section headers.');
    reqs.push('Highlight actionable insights and key takeaways upfront.');
  }

  sections.push(`REQUIREMENTS:\n1. ${reqs.join('\n2. ')}`);

  const constraintsList: string[] = [];
  if (constraints && constraints.trim()) {
    constraintsList.push(constraints.trim());
  }
  constraintsList.push('Do not make unverified assumptions; if context is missing, explicitly state what is assumed.');
  constraintsList.push('Avoid conversational filler, greetings, or self-referential pleasantries.');

  sections.push(`CONSTRAINTS:\n- ${constraintsList.join('\n- ')}`);

  const finalFormat = outputFormat || (category === 'coding' ? 'Markdown with clean TypeScript/Code blocks' : 'Structured Markdown with headers and bullet points');
  sections.push(`OUTPUT FORMAT:\n${finalFormat}`);

  const promptText = sections.join('\n\n');

  const quality = evaluatePromptQuality(goal, promptText, {
    hasRole: Boolean(assignedRole),
    hasContext: contextParts.length > 1,
    hasConstraints: Boolean(constraints),
    hasFormat: Boolean(outputFormat),
  });

  return {
    promptText,
    quality,
    category,
    model,
  };
}

export function evaluatePromptQuality(
  goal: string,
  fullPrompt: string,
  flags?: { hasRole?: boolean; hasContext?: boolean; hasConstraints?: boolean; hasFormat?: boolean }
): QualityMetrics {
  const goalLength = goal.trim().length;
  const wordCount = fullPrompt.trim().split(/\s+/).length;

  const clarity = Math.min(100, Math.max(50, goalLength > 15 ? 90 : goalLength * 5));
  const specificity = Math.min(100, Math.max(40, wordCount > 40 ? 92 : wordCount * 2));
  const contextScore = flags?.hasContext ? 95 : (fullPrompt.includes('CONTEXT') ? 88 : 65);
  const constraintScore = flags?.hasConstraints ? 96 : (fullPrompt.includes('CONSTRAINTS') ? 90 : 70);
  const formatScore = flags?.hasFormat ? 98 : (fullPrompt.includes('OUTPUT FORMAT') ? 94 : 75);

  const overall = Math.round(
    clarity * 0.2 +
    specificity * 0.2 +
    contextScore * 0.2 +
    constraintScore * 0.2 +
    formatScore * 0.2
  );

  const suggestions: string[] = [];
  if (goalLength < 25) {
    suggestions.push('Add more details to your goal to increase prompt specificity.');
  }
  if (!flags?.hasContext && !fullPrompt.includes('CONTEXT')) {
    suggestions.push('Specify target audience, tools, or domain background for higher context scores.');
  }
  if (!flags?.hasConstraints && !fullPrompt.includes('CONSTRAINTS')) {
    suggestions.push('Include strict constraints (e.g. max word limit, language rules) to prevent off-target responses.');
  }
  if (!flags?.hasFormat) {
    suggestions.push('Explicitly request your desired output format (Markdown table, JSON, step-by-step code).');
  }

  return {
    score: overall,
    clarity,
    specificity,
    context: contextScore,
    constraints: constraintScore,
    format: formatScore,
    suggestions,
  };
}

export function improveUserPrompt(
  rawPrompt: string,
  options: {
    clarity?: boolean;
    specificity?: boolean;
    structure?: boolean;
    context?: boolean;
    constraints?: boolean;
    format?: boolean;
  }
): { improvedText: string; score: number; changesMade: string[] } {
  const changes: string[] = [];
  let role = 'Domain Expert';

  if (/code|react|javascript|python|api|bug|database/i.test(rawPrompt)) {
    role = 'Senior Software Engineer';
  } else if (/study|learn|exam|explain|tutor/i.test(rawPrompt)) {
    role = 'Academic Specialist and Tutor';
  } else if (/write|blog|essay|article|email/i.test(rawPrompt)) {
    role = 'Professional Editor & Copywriter';
  }

  const improvedSections: string[] = [];

  improvedSections.push(`ROLE:\nYou are a highly skilled ${role}.`);
  improvedSections.push(`OBJECTIVE:\n${rawPrompt.trim()}`);
  changes.push('Assigned explicit professional persona and role');

  if (options.context || !rawPrompt.toLowerCase().includes('context')) {
    improvedSections.push(`CONTEXT & SPECIFICATIONS:\n- Provide comprehensive background where necessary.\n- Ensure solution is practical, scalable, and modern.`);
    changes.push('Added structured context section');
  }

  if (options.constraints || options.specificity) {
    improvedSections.push(`CONSTRAINTS:\n- State any assumptions explicitly upfront.\n- Avoid unnecessary conversational fluff or vague generalizations.\n- Focus on actionable, accurate results.`);
    changes.push('Injected strict constraints to eliminate filler responses');
  }

  if (options.format || options.structure) {
    improvedSections.push(`OUTPUT FORMAT:\n1. Executive Summary / Direct Answer\n2. Detailed Step-by-Step Breakdown\n3. Key Considerations & Tradeoffs`);
    changes.push('Standardized clear output format');
  }

  const improvedText = improvedSections.join('\n\n');
  const score = Math.min(98, 70 + changes.length * 7);

  return {
    improvedText,
    score,
    changesMade: changes,
  };
}
