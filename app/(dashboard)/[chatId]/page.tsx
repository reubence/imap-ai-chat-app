'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { MessageSquare } from 'lucide-react';
import { Message, MessageContent } from '@/components/ai-elements/message';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  console.log(messages);
  
  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      <Conversation className="relative w-full" style={{ height: '500px' }}>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12" />}
              title="No messages yet"
              description="Start a conversation to see messages here"
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role === 'user' ? 'user' : 'assistant'} key={message.id}>
                <MessageContent>
                  {message.parts
                  .map((part) => {
                    part.type === 'text' ? part.text : null
                    })
                  .join('')}
                </MessageContent>
            </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
          className='fixed bg-zinc-100 bottom-0 left-0 right-0 w-full max-w-md p-2 mb-8 mx-auto rounded-lg border border-zinc-300 shadow-xl'
        />
      </form>
    </div>
  );
}