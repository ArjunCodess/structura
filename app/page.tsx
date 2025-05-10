import CodeSection from "@/components/landing/code-section";
import Demo from "@/components/landing/demo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary-50 grainy-light">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-52">
          <div className="px-6 lg:px-0 my-auto">
            <div className="gap-8 max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
              <h1
                className={cn(
                  "relative tracking-tight sm:text-left font-bold leading-[4rem] text-neutral-900 text-5xl md:text-7xl"
                )}
              >
                Structura.AI
              </h1>

              <p className="text-lg text-center lg:text-left text-balance md:text-wrap">
                Transforming unstructured text into structured data in{" "}
                <span className={cn("font-bold text-primary-600")}>
                  under 3 seconds
                </span>
                . Extract meaningful information from any text with our powerful
                API and interactive playground.
              </p>

              <ul className="space-y-2 font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary-600" />{" "}
                    Lightning fast extraction
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-primary-600" />{" "}
                    Customizable output format
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-primary-600" />{" "}
                    Developer-friendly API
                  </li>
                </div>
              </ul>

              <Link
                href="/playground"
                className="flex gap-4 flex-col sm:flex-row w-full"
              >
                <Button variant="default" className="w-full">
                  Try the Playground
                  <MoveRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative px-8 sm:px-16 md:px-0 md:mx-auto md:max-w-xl w-full lg:mx-0">
            <Image
              alt="try-it"
              aria-hidden="true"
              src="/try-it.png"
              className="absolute w-40 left-2/3 -top-12 select-none hidden sm:block"
              width={100}
              height={100}
            />
            <Demo />
          </div>
        </div>
      </div>

      <section className="bg-primary-100 grainy-dark px-4">
        <div className="mx-auto max-w-6xl gap-6 pb-24 pt-20 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="w-full flex flex-col">
            <div className="flex justify-center text-center">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
                From{" "}
                <span className="bg-primary-600 text-white rounded-lg px-4">
                  chaos
                </span>{" "}
                to clarity
              </h2>
            </div>

            <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
              <span className="font-semibold">
                Stop wasting time parsing text manually.
              </span>{" "}
              Whether you&apos;re building a data pipeline or need to extract
              information from documents, Structura.AI helps you transform
              unstructured text into clean, structured data in seconds.
            </p>

            <div className="grid gap-40 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-20 text-center">
              <div className="relative z-10">
                <p className="font-semibold text-lg">For Developers</p>
                <p className="mt-2 text-balance">
                  Integrate our API into your applications with just a few lines
                  of code. Get structured data from any text input with
                  customizable output formats.
                </p>
              </div>

              <div className="relative z-10">
                <p className="font-semibold text-lg">For Everyone</p>
                <p className="mt-2 text-balance">
                  Use our interactive playground to test the API without writing
                  any code. Perfect for non-technical users who need to extract
                  data from text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="api" className="bg-primary-50 grainy-light">
        <div className="mx-auto max-w-6xl gap-6 py-24 lg:gap-x-8 lg:px-8">
          <h2 className="mx-auto text-balance text-5xl sm:text-6xl text-center font-bold leading-[4.25rem] tracking-tight max-w-2xl text-slate-900">
            Try it{" "}
            <span className="px-4 bg-primary-600 rounded-lg text-white">
              now
            </span>
          </h2>

          <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance">
            <span className="font-semibold">
              Extract structured data in seconds!
            </span>{" "}
            Use our playground to test the API with your own text and schema.
          </p>

          <div
            id="api"
            className="w-full flex flex-col items-center mt-12 px-4"
          >
            <div className="relative max-w-[50rem] w-full text-left p-5 bg-[#1e1e1e] rounded-xl shadow">
              <CodeSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}