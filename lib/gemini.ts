import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  console.error("Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable");
}

export const geminiModel = google('gemini-2.5-flash');

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateContent(
  messages: ChatMessage[],
  options?: { maxRetries?: number }
) {
  const { maxRetries = 3 } = options || {};

  const aiSdkMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const result = await generateText({
        model: geminiModel,
        messages: aiSdkMessages,
        maxRetries: maxRetries,
      });

      return { content: result.text };
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retries))
      );
    }
  }

  throw new Error("Failed to generate content after maximum retries");
}

export async function generateStructuredObject(
  messages: ChatMessage[],
  schema: z.ZodSchema,
  options?: { maxRetries?: number }
) {
  const { maxRetries = 3 } = options || {};

  const aiSdkMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const result = await generateObject({
        model: geminiModel,
        messages: aiSdkMessages,
        schema: schema,
        maxRetries: maxRetries,
      });

      return { object: result.object };
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retries))
      );
    }
  }

  throw new Error("Failed to generate structured object after maximum retries");
}