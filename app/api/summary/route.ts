import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { content } = await req.json();

  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that summarizes blog content in long convaluted poetic verse.',
      },
      {
        role: 'user',
        content: `Please provide a summary of the following blog post in long convaluted poetic verse: ${content}`,
      },
    ],
  });


  return result.toDataStreamResponse();
}
