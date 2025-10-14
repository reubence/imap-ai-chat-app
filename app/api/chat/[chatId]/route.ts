import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { chatId } = await params;

    if (!chatId) {
      return new NextResponse('Chat ID is required', { status: 400 });
    }
    

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!chat || chat.userId !== session.user.id) {
      return new NextResponse('Chat not found', { status: 404 });
    }

    const messages = chat.messages.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
    }));

    return NextResponse.json(messages);
  } catch (error) {
    console.error('[GET_CHAT_MESSAGES]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
