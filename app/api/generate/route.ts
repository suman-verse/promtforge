import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredPrompt } from '@/lib/ai/promptEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, goal, model, role, context, constraints, outputFormat, tone, complexity, customFields } = body;

    if (!goal || typeof goal !== 'string' || !goal.trim()) {
      return NextResponse.json(
        { error: 'Goal is required to generate a prompt.' },
        { status: 400 }
      );
    }

    const result = generateStructuredPrompt({
      category: category || 'general',
      goal,
      model,
      role,
      context,
      constraints,
      outputFormat,
      tone,
      complexity,
      customFields,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Prompt Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please check input.' },
      { status: 500 }
    );
  }
}
