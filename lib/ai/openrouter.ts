import {
  PromptGeneratorInput,
  GeneratedPromptResult,
  QualityMetrics,
  generateStructuredPrompt,
  evaluatePromptQuality,
  improveUserPrompt,
} from './promptEngine';

export interface ModelOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
}

export const AVAILABLE_AI_MODELS: ModelOption[] = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    badge: 'Fast & Precise',
    description: 'Fast, intelligent, and highly accurate for prompt engineering.',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3',
    badge: 'Elite Logic & Code',
    description: 'Specialized in technical, reasoning, and system prompts.',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    badge: 'High Precision',
    description: 'Open-weight state of the art instruction following.',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    badge: 'Master Nuance',
    description: 'Master of nuanced language, style fidelity, and complex instructions.',
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash',
    badge: 'Ultra Fast',
    description: 'Sub-second response latency for quick iterations.',
  },
];

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

const OPENROUTER_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

function normalizeScore(score: unknown, fallback = 95): number {
  if (typeof score !== 'number' || isNaN(score)) return fallback;
  if (score <= 10 && score > 0) return Math.min(100, Math.round(score * 10));
  return Math.min(100, Math.max(1, Math.round(score)));
}

async function callOpenRouter(model: string, messages: { role: string; content: string }[], temperature = 0.7) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`${OPENROUTER_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.SITE_NAME || 'PromptForge AI Studio',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4o-mini',
        messages,
        temperature,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API responded with ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

function cleanJsonResponse(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

/**
 * Insane Meta-Prompt System Framework
 * Applies Anthropic / OpenAI / DeepSeek elite prompt engineering specifications
 */
const EXPERT_META_SYSTEM_PROMPT = `You are the World's Foremost Meta-Prompt Engineer and AI Systems Architect.
Your sole mission is to take any raw user goal or prompt specification and synthesize an INSANELY EXPERT, PRODUCTION-GRADE, BATTLE-TESTED prompt that commands top-tier performance from frontier AI models (Claude 3.5 Sonnet, GPT-4o, o1/o3, DeepSeek V3/R1, Cursor).

### CORE PROMPT ENGINEERING MANDATES:
1. **Hyper-Calibrated Role Identity**: 
   Assign an elite, authoritative persona with real-world seniority, deep technical grounding, and exact domain mastery (e.g. "Principal Distributed Systems Architect & Security Auditor with 15+ years experience designing zero-latency microservices").

2. **Crystal Objective & Scope Definition**:
   Define the exact mission, boundaries, and expected depth with zero room for ambiguity.

3. **Structured Context & Variable Slots**:
   Use clean delimiters or variable slots (e.g. \`[INSERT CODE / DATA HERE]\` or \`<context_inputs>\`) so the prompt is immediately modular, reusable, and ready to receive data.

4. **Exhaustive Step-by-Step Execution Protocol (Chain-of-Thought Activation)**:
   Instruct the receiving AI to think through edge cases, system trade-offs, performance implications, and architecture before writing the solution. Include structured numbered instructions.

5. **Ironclad Negative Constraints & Guardrails**:
   Explicitly enforce:
   - ZERO placeholders (no \`// TODO\`, \`// implement here\`, \`...\`). Every snippet or explanation must be complete and unabridged.
   - ZERO conversational fluff, pleasantries, filler phrases, or self-referential introductory statements.
   - Explicit assumption declaration: if context is missing, state assumptions rather than hallucinating facts.
   - Non-destructive surgical changes: preserve surrounding working code and conventions.

6. **Deterministic Output Specification**:
   Prescribe the exact response layout (Executive Summary, Technical Breakdown, Production Code/Output, Verification & Test Checklist).

### OUTPUT SCHEMA (Valid JSON):
{
  "promptText": "The complete, ready-to-copy engineered markdown prompt",
  "clarityScore": 98,
  "specificityScore": 96,
  "contextScore": 94,
  "constraintsScore": 98,
  "formatScore": 97,
  "overallScore": 97,
  "optimizationTips": [
    "High-authority persona assigned to maximize reasoning depth",
    "Anti-placeholder & anti-laziness guardrails enforced",
    "Structured 4-stage output format specified"
  ]
}`;

/**
 * Generate a complete expert-level prompt using the Insane Meta-Prompt Engine
 */
export async function generateAIPrompt(input: PromptGeneratorInput): Promise<GeneratedPromptResult> {
  const targetModel = input.model?.includes('/') ? input.model : 'openai/gpt-4o-mini';

  const userPayload = JSON.stringify({
    domainCategory: input.category || 'general',
    primaryGoal: input.goal,
    targetEngine: input.model || 'General Frontier LLM',
    preferredRole: input.role || null,
    domainContext: input.context || null,
    strictConstraints: input.constraints || null,
    outputStructurePreference: input.outputFormat || null,
    toneAndDemeanor: input.tone || null,
    complexityTier: input.complexity || 'Expert / Principal Level',
    domainSpecificParameters: input.customFields || {},
  });

  try {
    const rawAiOutput = await callOpenRouter(targetModel, [
      { role: 'system', content: EXPERT_META_SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Synthesize an insane, expert-tier engineered prompt based on these parameters:\n${userPayload}`,
      },
    ]);

    const parsed = JSON.parse(cleanJsonResponse(rawAiOutput));

    const clarity = normalizeScore(parsed.clarityScore, 96);
    const specificity = normalizeScore(parsed.specificityScore, 95);
    const context = normalizeScore(parsed.contextScore, 94);
    const constraints = normalizeScore(parsed.constraintsScore, 96);
    const format = normalizeScore(parsed.formatScore, 97);
    const overall = normalizeScore(
      parsed.overallScore,
      Math.round((clarity + specificity + context + constraints + format) / 5)
    );

    const quality: QualityMetrics = {
      score: overall,
      clarity,
      specificity,
      context,
      constraints,
      format,
      suggestions: Array.isArray(parsed.optimizationTips) ? parsed.optimizationTips : [
        'Domain persona calibrated for high-precision outputs',
        'Anti-hallucination and anti-laziness constraints injected',
      ],
    };

    return {
      promptText: parsed.promptText || '',
      quality,
      category: input.category || 'general',
      model: targetModel,
    };
  } catch (error) {
    console.warn('AI Prompt Engine fallback to local structured generator:', error);
    return generateStructuredPrompt(input);
  }
}

/**
 * Optimize an existing raw prompt using the Insane Refiner Engine
 */
export async function improveAIPrompt(
  rawPrompt: string,
  options: {
    clarity?: boolean;
    specificity?: boolean;
    structure?: boolean;
    context?: boolean;
    constraints?: boolean;
    format?: boolean;
  }
): Promise<{ improvedText: string; score: number; changesMade: string[] }> {
  const targetModel = 'openai/gpt-4o-mini';

  const refinerSystemPrompt = `You are an Elite Prompt Engineering Auditor & Optimizer.
Analyze the user's raw prompt and transform it into an insanely high-scoring, expert-level prompt.

APPLIED REFACTORING RULES:
1. Grounding: Replace vague requests with a Principal/Senior domain specialist identity.
2. Architecture: Organize into clear Markdown headers (ROLE, OBJECTIVE, CONTEXT & INPUTS, STEP-BY-STEP EXECUTION RULES, HARD CONSTRAINTS, OUTPUT SCHEMA).
3. Anti-Laziness Guardrails: Inject explicit rules forbidding placeholder comments, conversational filler, and truncated answers.
4. Completeness: Expand generic terms into exact technical criteria, edge cases, and verification requirements.

Return valid JSON matching:
{
  "improvedText": "The fully rewritten and optimized expert prompt in clean markdown",
  "score": 98,
  "changesMade": [
    "Injected Principal Domain Expert persona with explicit operational authority",
    "Added anti-placeholder and anti-hallucination negative constraints",
    "Standardized 4-part deterministic output format with verification checks"
  ]
}`;

  try {
    const rawAiOutput = await callOpenRouter(targetModel, [
      { role: 'system', content: refinerSystemPrompt },
      {
        role: 'user',
        content: `Original Raw Prompt:\n${rawPrompt}\n\nTarget Optimizations:\n${JSON.stringify(options)}`,
      },
    ]);

    const parsed = JSON.parse(cleanJsonResponse(rawAiOutput));

    return {
      improvedText: parsed.improvedText || rawPrompt,
      score: normalizeScore(parsed.score, 97),
      changesMade: Array.isArray(parsed.changesMade)
        ? parsed.changesMade
        : [
            'Injected authoritative persona framing',
            'Added anti-placeholder negative constraints',
            'Structured output formatting and edge case rules',
          ],
    };
  } catch (error) {
    console.warn('AI Prompt Optimizer fallback to local engine:', error);
    return improveUserPrompt(rawPrompt, options);
  }
}

/**
 * Quick AI modifier (Shorten, Expand, Beginner, Expert)
 */
export async function modifyAIPrompt(
  promptText: string,
  mode: 'shorten' | 'expand' | 'beginner' | 'expert'
): Promise<{ modifiedText: string; quality: QualityMetrics }> {
  const targetModel = 'openai/gpt-4o-mini';

  const modeInstructions: Record<string, string> = {
    shorten:
      'Ultra-dense compression: Condense the prompt into a razor-sharp, zero-fluff directive while preserving all hard constraints, output schemas, and critical parameters.',
    expand:
      'Exhaustive deep-dive expansion: Inject comprehensive edge-case analysis, architectural trade-off comparisons, deep security/reliability rules, step-by-step verification proofs, and exhaustive input specifications.',
    beginner:
      'Socratic & First-Principles Tutor: Restructure the prompt so the receiving AI acts as a world-class mentor, using intuitive mental models, step-by-step analogies, and progressive comprehension check questions.',
    expert:
      'Principal / Staff Architect Level: Elevate the prompt to elite engineering standards, demanding AST-level typing, zero-dependency minimalism, memory profiling, RFC compliance, and zero conversational pleasantries.',
  };

  const modifierSystemPrompt = `You are an AI Prompt Transformation Engine.
Transform the provided prompt according to this directive:
"${modeInstructions[mode] || 'Optimize prompt'}"

Maintain the structured sections: ROLE, OBJECTIVE, REQUIREMENTS & EXECUTION, CONSTRAINTS & GUARDRAILS, OUTPUT FORMAT.

Return valid JSON:
{
  "modifiedText": "The transformed prompt in clean markdown",
  "score": 97,
  "clarity": 96,
  "specificity": 95,
  "context": 94,
  "constraints": 96,
  "format": 97,
  "optimizationTips": ["Successfully adapted prompt to ${mode} mode"]
}`;

  try {
    const rawAiOutput = await callOpenRouter(targetModel, [
      { role: 'system', content: modifierSystemPrompt },
      { role: 'user', content: `Original Prompt:\n${promptText}` },
    ]);

    const parsed = JSON.parse(cleanJsonResponse(rawAiOutput));

    const clarity = normalizeScore(parsed.clarity, 96);
    const specificity = normalizeScore(parsed.specificity, 95);
    const context = normalizeScore(parsed.context, 94);
    const constraints = normalizeScore(parsed.constraints, 96);
    const format = normalizeScore(parsed.format, 97);
    const score = normalizeScore(
      parsed.score,
      Math.round((clarity + specificity + context + constraints + format) / 5)
    );

    return {
      modifiedText: parsed.modifiedText || promptText,
      quality: {
        score,
        clarity,
        specificity,
        context,
        constraints,
        format,
        suggestions: Array.isArray(parsed.optimizationTips)
          ? parsed.optimizationTips
          : [`Adapted for ${mode} mode`],
      },
    };
  } catch (error) {
    console.warn('AI Modifier fallback to local engine:', error);
    return {
      modifiedText: `${mode === 'shorten' ? 'Concise directive:\n' : mode === 'expand' ? 'Comprehensive deep-dive specification:\n' : ''}${promptText}`,
      quality: evaluatePromptQuality(promptText.slice(0, 50), promptText),
    };
  }
}
