"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PlaygroundResultProps {
  result: unknown;
  error: string | null;
}

function formatValue(value: unknown): string {
  if (value === null) return "Not found";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

function renderUserFriendlyView(data: Record<string, unknown>) {
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <span className="text-neutral-900 dark:text-white">
            {formatValue(value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PlaygroundResult({ result, error }: PlaygroundResultProps) {
  const [activeTab, setActiveTab] = useState("user-friendly");

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        Output
      </h3>
      <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-4">
        {error ? (
          <div className="text-red-600 dark:text-red-400">{error}</div>
        ) : result ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="user-friendly" className="w-1/2">User Friendly</TabsTrigger>
              <TabsTrigger value="json" className="w-1/2">JSON View</TabsTrigger>
            </TabsList>
            <TabsContent value="user-friendly">
              {renderUserFriendlyView(result as Record<string, unknown>)}
            </TabsContent>
            <TabsContent value="json">
              <pre className="whitespace-pre-wrap break-words text-sm font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-neutral-500 dark:text-neutral-400 italic">
            Results will appear here...
          </div>
        )}
      </div>
    </div>
  );
} 