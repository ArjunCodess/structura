import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateStructuredObject, ChatMessage } from "@/lib/gemini";
import { jsonSchemaToZod, JsonSchema } from "@/lib/schema";
import { RetryablePromise } from "@/lib/retry";
import { rateLimit } from "@/lib/rate-limit";

const MAX_DATA_LENGTH = 5000;
const MAX_RETRIES = 3;

const createPrompt = (data: string, format: JsonSchema) => `You are an AI that extracts structured data from unstructured text. Your task is to:
1. Analyze the input text carefully
2. Extract relevant information based on the provided JSON schema
3. Return ONLY valid JSON that matches the schema exactly
4. Use null for any fields you cannot determine with high confidence
5. Format the output as clean, properly indented JSON
6. Do not include any explanatory text or comments
7. Ensure all values match their specified types (string, number, boolean, array)
8. Begin with { and end with } only
9. Do not wrap the JSON in markdown code blocks or backticks

Here's an example:
Input: "John is 25 years old and studies computer science at university."
Schema: {
  name: { type: "string" },
  age: { type: "number" },
  isStudent: { type: "boolean" },
  courses: {
    type: "array",
    items: { type: "string" }
  }
}
Expected Output: {
  "name": "John",
  "age": 25,
  "isStudent": true,
  "courses": ["computer science"]
}

Now process this input:
DATA:
"${data}"

Extract the structured data according to the following schema:
${JSON.stringify(format, null, 2)}`;

const requestSchema = z.object({
  data: z.string().max(MAX_DATA_LENGTH),
  format: z.record(z.string(), z.any()).refine((val) => Object.keys(val).length > 0, {
    message: "Format must have at least one property",
  }),
});

export const POST = async (req: NextRequest) => {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success, limit, remaining, reset } = await rateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const parseResult = requestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { data, format } = parseResult.data;

    const dynamicSchema = jsonSchemaToZod(format as JsonSchema);

    const validationResult = await RetryablePromise.retry(
      MAX_RETRIES,
      async (resolve, reject) => {
        try {
          const messages: ChatMessage[] = [
            {
              role: "user",
              content: createPrompt(data, format as JsonSchema),
            },
          ];

          const result = await generateStructuredObject(
            messages, 
            dynamicSchema,
            { maxRetries: MAX_RETRIES }
          );

          resolve(result.object);
        } catch (err) {
          reject(err);
        }
      }
    );

    return NextResponse.json(validationResult, { status: 200 });
  } catch (error) {
    console.error("Extract API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};