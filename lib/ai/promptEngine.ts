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
    model = 'Frontier LLM',
    role,
    context,
    constraints,
    outputFormat,
    tone,
    complexity = 'Senior Staff / Principal Level',
    customFields = {},
  } = input;

  const sections: string[] = [];

  let assignedRole = role;
  if (!assignedRole) {
    switch (category) {
      case 'coding':
        assignedRole = `Principal Distributed Systems Architect, Security Auditor, and Staff Software Engineer`;
        break;
      case 'studying':
        assignedRole = `Distinguished Cognitive Learning Specialist, Socratic Mentor, and Academic Tutor`;
        break;
      case 'writing':
        assignedRole = `Executive Editorial Strategist, Award-Winning Copy Director, and Technical Author`;
        break;
      case 'research':
        assignedRole = `Principal Research Scientist, Empirical Synthesizer, and Methodological Analyst`;
        break;
      case 'business':
        assignedRole = `Senior Management Consultant, Strategy Partner, and Operational Architect`;
        break;
      case 'marketing':
        assignedRole = `Head of Growth Marketing, Conversion Rate Strategist, and Direct-Response Copy Director`;
        break;
      case 'career':
        assignedRole = `Executive Talent Partner, Leadership Coach, and Senior Technical Interviewer`;
        break;
      default:
        assignedRole = `Elite Domain Specialist and Principal Systems Advisor`;
    }
  }

  // 1. Role Section
  sections.push(`ROLE & PERSONA:\nYou are an experienced ${assignedRole}. Your responses represent senior-staff expertise, uncompromising rigor, and clear, actionable precision.`);

  // 2. Objective Section
  sections.push(`OBJECTIVE:\n${goal.trim()}`);

  // 3. Context & Parameters
  const contextParts: string[] = [];
  if (context && context.trim()) {
    contextParts.push(context.trim());
  }
  if (model) {
    contextParts.push(`Target AI Engine: ${model}`);
  }
  if (complexity) {
    contextParts.push(`Complexity & Depth Standard: ${complexity}`);
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

  // 4. Execution Directives
  const reqs: string[] = [];
  reqs.push('Systematically analyze edge cases, architectural trade-offs, and failure modes before concluding.');
  if (category === 'coding') {
    reqs.push('Write production-grade, idiomatic, fully-typed code adhering strictly to best practices.');
    reqs.push('Zero placeholders: Provide complete, unabridged, copy-pasteable implementations (no // TODO or truncated functions).');
    reqs.push('Address memory efficiency, computational complexity, security vulnerabilities, and error handling.');
    reqs.push('Include runnable unit tests or verification assertions covering normal and edge cases.');
  } else if (category === 'studying') {
    reqs.push('Deconstruct abstract concepts into intuitive first-principles mental models.');
    reqs.push('Anchor difficult mechanics with concrete, relatable real-world analogies.');
    reqs.push('Include 2-3 interactive comprehension verification questions.');
  } else if (category === 'writing') {
    reqs.push('Establish strong visual hierarchy with punchy headings, clear bullet arguments, and active voice.');
    reqs.push('Eliminate passive voice, fluff, buzzwords, and redundant filler.');
    reqs.push('Maintain strict tone calibration suited for high-impact readers.');
  } else {
    reqs.push('Structure your reasoning logically with clear section headers.');
    reqs.push('Deliver actionable conclusions, metrics, and implementation steps upfront.');
  }

  sections.push(`REQUIREMENTS & EXECUTION PROTOCOL:\n1. ${reqs.join('\n2. ')}`);

  // 5. Hard Negative Constraints
  const constraintsList: string[] = [];
  if (constraints && constraints.trim()) {
    constraintsList.push(constraints.trim());
  }
  constraintsList.push('Zero conversational filler, self-referential introductory pleasantries ("Sure, I can help!"), or hedging.');
  constraintsList.push('Never invent unverified facts; if required context is missing, explicitly state assumptions upfront.');
  constraintsList.push('Do not truncate code blocks or omit logic with ellipsis (...) or placeholder comments.');

  sections.push(`CONSTRAINTS & GUARDRAILS:\n- ${constraintsList.join('\n- ')}`);

  // 6. Output Format
  const finalFormat = outputFormat || (category === 'coding'
    ? '1. Architecture Summary & Key Decisions\n2. Complete Production-Ready Code Blocks (Fully Typed)\n3. Edge Cases, Security & Verification Test Suite'
    : '1. Executive Summary & Direct Answer\n2. Detailed Step-by-Step Breakdown\n3. Critical Nuances, Trade-Offs & Action Checklist');

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

  const clarity = Math.min(100, Math.max(70, goalLength > 15 ? 96 : 80));
  const specificity = Math.min(100, Math.max(65, wordCount > 40 ? 95 : 75));
  const contextScore = flags?.hasContext ? 96 : (fullPrompt.includes('CONTEXT') ? 92 : 80);
  const constraintScore = flags?.hasConstraints ? 98 : (fullPrompt.includes('CONSTRAINTS') ? 95 : 82);
  const formatScore = flags?.hasFormat ? 98 : (fullPrompt.includes('OUTPUT FORMAT') ? 96 : 85);

  const overall = Math.round(
    clarity * 0.2 +
    specificity * 0.2 +
    contextScore * 0.2 +
    constraintScore * 0.2 +
    formatScore * 0.2
  );

  const suggestions: string[] = [];
  if (goalLength < 25) {
    suggestions.push('Add specific technical dependencies or target criteria to maximize specificity.');
  }
  if (!flags?.hasContext && !fullPrompt.includes('CONTEXT')) {
    suggestions.push('Specify target environment, frameworks, or domain assumptions.');
  }
  if (!flags?.hasConstraints && !fullPrompt.includes('CONSTRAINTS')) {
    suggestions.push('Include strict negative constraints to prevent hallucination and laziness.');
  }
  if (!flags?.hasFormat) {
    suggestions.push('Explicitly request desired output schemas (Markdown, JSON, Code).');
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
  let role = 'Principal Domain Architect and Staff Specialist';

  if (/code|react|javascript|typescript|python|api|bug|database|sql|docker|k8s/i.test(rawPrompt)) {
    role = 'Principal Software Engineer & Distributed Systems Architect';
  } else if (/study|learn|exam|explain|tutor|math|physics|biology/i.test(rawPrompt)) {
    role = 'Distinguished Academic Specialist & Socratic Cognitive Tutor';
  } else if (/write|blog|essay|article|email|copy|headline/i.test(rawPrompt)) {
    role = 'Executive Technical Editor & Lead Conversion Copy Strategist';
  }

  const improvedSections: string[] = [];

  improvedSections.push(`ROLE & PERSONA:\nYou are an experienced ${role}. You provide authoritative, exhaustive, and rigorously verified solutions.`);
  improvedSections.push(`OBJECTIVE:\n${rawPrompt.trim()}`);
  changes.push('Assigned calibrated senior-staff persona');

  if (options.context || !rawPrompt.toLowerCase().includes('context')) {
    improvedSections.push(`CONTEXT & SPECIFICATIONS:\n- Target: Production-ready standard with high scalability and maintainability.\n- Assumptions: State all implicit assumptions upfront before implementation.`);
    changes.push('Injected structured operational context');
  }

  if (options.structure || options.specificity) {
    improvedSections.push(`EXECUTION PROTOCOL:\n1. Deconstruct the problem and reason through edge cases and failure modes.\n2. Provide complete, unabridged solutions without placeholders.\n3. Validate results with explicit test cases or verification steps.`);
    changes.push('Injected step-by-step execution protocol');
  }

  if (options.constraints || options.specificity) {
    improvedSections.push(`CONSTRAINTS & GUARDRAILS:\n- Zero placeholders: Do not use // TODO, // implement here, or truncation (...).\n- Zero conversational filler, hedging, or self-referential pleasantries.\n- Guarantee robust error handling and adherence to industry best practices.`);
    changes.push('Enforced strict anti-placeholder and anti-hallucination guardrails');
  }

  if (options.format || options.structure) {
    improvedSections.push(`OUTPUT FORMAT:\n1. Executive Summary & Architectural Overview\n2. Complete Implementation (Unabridged Code / Content)\n3. Edge Cases, Verification Proofs & Trade-Off Analysis`);
    changes.push('Standardized 3-tier deterministic output contract');
  }

  const improvedText = improvedSections.join('\n\n');
  const score = Math.min(99, 85 + changes.length * 3);

  return {
    improvedText,
    score,
    changesMade: changes,
  };
}
