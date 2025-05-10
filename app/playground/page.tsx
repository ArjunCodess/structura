import { Suspense } from "react";
import ExtractPlayground from "@/components/playground/playground";

export default function ExtractPage() {
  return (
    <section>
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-16 sm:pb-24 pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 lg:pt-24">
          <div className="px-0 lg:px-0 w-full text-center">
            <div className="gap-6 sm:gap-8 text-center flex flex-col items-center">
              <h1 className="relative tracking-tight font-bold leading-[3.25rem] sm:leading-[4rem] text-neutral-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Structura Playground
              </h1>

              <p className="text-base sm:text-lg text-center text-balance md:text-wrap px-2">
                Test the Extract API by providing unstructured text and a JSON schema. Transform your data in{" "}
                <span className="font-bold text-primary-600">
                  under 3 seconds
                </span>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <Suspense fallback={
              <div className="flex justify-center items-center h-48 sm:h-64">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary-700"></div>
              </div>
            }>
              <ExtractPlayground />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}