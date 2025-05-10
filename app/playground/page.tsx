import { Suspense } from "react";
import ExtractPlayground from "@/components/playground/playground";

export default function ExtractPage() {
  return (
    <div className="bg-primary-40 bg-[url('/base.png')] bg-repeat bg-blend-multiply min-h-screen">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:pt-32">
          <div className="px-6 lg:px-0 w-full text-center">
            <div className="gap-8 text-center flex flex-col items-center">
              <h1 className="relative tracking-tight font-bold leading-[4rem] text-neutral-900 text-5xl md:text-7xl">
                Structura Playground
              </h1>

              <p className="text-lg text-center text-balance md:text-wrap">
                Test the Extract API by providing unstructured text and a JSON schema. Transform your data in{" "}
                <span className="font-bold text-primary-600">
                  under 3 seconds
                </span>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 px-4">
            <Suspense fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              </div>
            }>
              <ExtractPlayground />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}