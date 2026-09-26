import { NextRequest, NextResponse } from 'next/server';
import { generateAIPrompt } from '@/lib/ai/openrouter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      category,
      goal,
      model,
      role,
      context,
      constraints,
      outputFormat,
      tone,
      complexity,
      customFields,
    } = body;

    if (!goal || typeof goal !== 'string' || !goal.trim()) {
      return NextResponse.json(
        { error: 'Goal is required to generate a prompt.' },
        { status: 400 }
      );
    }

    const result = await generateAIPrompt({
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
    console.error('Prompt Generation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' },
      { status: 500 }
    );
  }
}
