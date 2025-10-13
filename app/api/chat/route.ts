import { openai } from '@ai-sdk/openai';
import { openrouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, generateId, streamText, UIMessage } from 'ai';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
const session = await auth.api.getSession(req);
  const { messages, chatId }: any = await req.json();

  const result = streamText({
    model: openrouter.chat('openai/gpt-oss-120b'),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
    async onFinish({ text }) {
        return chatId;
    }
  });

  return result.toUIMessageStreamResponse();
}