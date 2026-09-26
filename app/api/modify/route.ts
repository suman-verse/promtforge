import { NextRequest, NextResponse } from 'next/server';
import { modifyAIPrompt } from '@/lib/ai/openrouter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText, mode } = body;

    if (!promptText || typeof promptText !== 'string' || !promptText.trim()) {
      return NextResponse.json(
        { error: 'Prompt text is required.' },
        { status: 400 }
      );
    }

    if (!mode || !['shorten', 'expand', 'beginner', 'expert'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode provided.' },
        { status: 400 }
      );
    }

    const result = await modifyAIPrompt(promptText, mode);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Prompt Modification API Error:', error);
    return NextResponse.json(
      { error: 'Failed to modify prompt.' },
      { status: 500 }
    );
  }
}
