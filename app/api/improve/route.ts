import { NextRequest, NextResponse } from 'next/server';
import { improveAIPrompt } from '@/lib/ai/openrouter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawPrompt, options } = body;

    if (!rawPrompt || typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt content is required to perform improvement.' },
        { status: 400 }
      );
    }

    const result = await improveAIPrompt(rawPrompt, options || {});

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Prompt Improvement API Error:', error);
    return NextResponse.json(
      { error: 'Failed to improve prompt. Please try again.' },
      { status: 500 }
    );
  }
}
