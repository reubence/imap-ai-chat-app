import { openai } from '@ai-sdk/openai';
import { openrouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { generateId } from 'better-auth';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { messages, chatId }: any = await req.json();

  const result = streamText({
    model: openrouter.chat('openai/gpt-oss-120b'),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
    async onFinish({ text }) {
      const a = await prisma.chat.upsert({
        where: {
          id: chatId ?? '',
        },
        create: {
          id: chatId ?? generateId(),
          userId: session.user.id,
          messages: {
            create: [
              ...messages.map((m: UIMessage) => ({
                id: m.id ?? generateId(), // nullish coalescing
                role: m.role,
                content: m.parts
                  .map(p => (p.type === 'text' ? p.text : ''))
                  .join(''),
              })),
              {
                id: generateId(),
                role: 'assistant',
                content: text,
              },
            ],
          },
        },
        update: {
          messages: {
            create: [
              ...messages.slice(-1).map((m: UIMessage) => ({
                id: m.id ?? generateId(),
                role: m.role,
                content: m.parts
                  .map(p => (p.type === 'text' ? p.text : ''))
                  .join(''),
              })),
              {
                id: generateId(),
                role: 'assistant',
                content: text,
              },
            ],
          },
        },
      });
    },
  });

  return result.toUIMessageStreamResponse();
}