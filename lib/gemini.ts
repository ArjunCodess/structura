import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export async function generateContent(
  messages: ChatMessage[],
  options?: { maxRetries?: number }
) {
  const { maxRetries = 3 } = options || {};

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const chat = geminiModel.startChat({
        history: messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : msg.role,
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage("");
      const text = result.response.text();

      return { content: text };
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