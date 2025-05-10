import { Suspense } from "react";
import ExtractPlayground from "@/components/playground/playground";

export default function ExtractPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Structura Playground
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Test the Extract API by providing unstructured text and a JSON schema
          </p>
        </div>
        
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white"></div>
          </div>
        }>
          <ExtractPlayground />
        </Suspense>
      </div>
    </div>
  );
}