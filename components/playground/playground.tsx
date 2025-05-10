"use client";

import { useState } from "react";
import { PlaygroundInput } from "./playground-input";
import { PlaygroundResult } from "./playground-result";
import { PlaygroundTips } from "./playground-tips";

const EXAMPLE_TEXT = "John is 25 years old and studies computer science at university.";
const EXAMPLE_SCHEMA = {
  name: { type: "string" },
  age: { type: "number" },
  isStudent: { type: "boolean" },
  courses: {
    type: "array",
    items: { type: "string" }
  }
};

export default function ExtractPlayground() {
  const [text, setText] = useState(EXAMPLE_TEXT);
  const [schema, setSchema] = useState<Record<string, { type: string; items?: { type: string } }>>(EXAMPLE_SCHEMA);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: text,
          format: schema,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-4 sm:space-y-6">
        <PlaygroundInput
          text={text}
          setText={setText}
          schema={schema}
          setSchema={setSchema}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        <PlaygroundResult result={result} error={error} />
        <PlaygroundTips />
      </div>
    </div>
  );
} 