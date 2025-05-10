import CodeSection from "@/components/landing/code-section";
import Demo from "@/components/landing/demo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary-40 bg-[url('/base.png')] bg-repeat bg-blend-multiply">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-16 pt-6 px-4 sm:pb-24 sm:pt-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-40">
          <div className="px-0 lg:px-0 my-auto">
            <div className="gap-6 sm:gap-8 max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
              <h1
                className={cn(
                  "relative tracking-tight sm:text-left font-bold leading-[3.25rem] sm:leading-[4rem] text-4xl sm:text-5xl md:text-7xl text-neutral-900"
                )}
              >
                Structura.AI
              </h1>

              <p className="text-base sm:text-lg text-center lg:text-left text-balance md:text-wrap">
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
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-600" />{" "}
                    Lightning fast extraction
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-600" />{" "}
                    Customizable output format
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-600" />{" "}
                    Developer-friendly API
                  </li>
                </div>
              </ul>

              <Link
                href="/playground"
                className="flex gap-2 sm:gap-4 flex-col sm:flex-row w-full mt-2"
              >
                <Button variant="default" className="w-full">
                  Try the Playground
                  <MoveRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative px-4 sm:px-16 md:px-0 mt-12 lg:mt-0 md:mx-auto md:max-w-xl w-full lg:mx-0">
            <Image
              alt="try-it"
              aria-hidden="true"
              src="/try-it.png"
              className="absolute w-28 sm:w-40 right-0 -top-8 sm:left-2/3 sm:-top-12 select-none"
              width={100}
              height={100}
            />
            <Demo />
          </div>
        </div>
      </div>

      <section className="bg-primary-100 bg-[url('/base.png')] bg-repeat bg-blend-multiply px-4">
        <div className="mx-auto max-w-6xl gap-6 py-16 sm:py-24 lg:py-32 lg:gap-x-8 lg:px-8">
          <div className="w-full flex flex-col">
            <div className="flex justify-center text-center">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight px-2">
                From{" "}
                <span className="bg-primary-700 text-white rounded-lg px-2 sm:px-4">
                  chaos
                </span>{" "}
                to clarity
              </h2>
            </div>

            <p className="text-center mx-auto mt-8 sm:mt-12 text-base sm:text-lg max-w-xl text-balance px-2">
              <span className="font-semibold">
                Stop wasting time parsing text manually.
              </span>{" "}
              Whether you&apos;re building a data pipeline or need to extract
              information from documents, Structura.AI helps you transform
              unstructured text into clean, structured data in seconds.
            </p>

            <div className="grid gap-16 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-12 sm:mt-20 text-center px-4">
              <div className="relative z-10">
                <p className="font-semibold text-lg">For Developers</p>
                <p className="mt-2 text-sm sm:text-base text-balance">
                  Integrate our API into your applications with just a few lines
                  of code. Get structured data from any text input with
                  customizable output formats.
                </p>
              </div>

              <div className="relative z-10">
                <p className="font-semibold text-lg">For Everyone</p>
                <p className="mt-2 text-sm sm:text-base text-balance">
                  Use our interactive playground to test the API without writing
                  any code. Perfect for non-technical users who need to extract
                  data from text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-40 bg-[url('/base.png')] bg-repeat bg-blend-multiply">
        <div className="mx-auto max-w-6xl gap-6 py-16 sm:py-24 lg:py-32 lg:gap-x-8 lg:px-8">
          <h2 className="mx-auto text-balance text-3xl sm:text-5xl lg:text-6xl text-center font-bold leading-tight sm:leading-[4.25rem] tracking-tight max-w-2xl text-slate-900 px-4">
            Try it{" "}
            <span className="px-2 sm:px-4 bg-primary-700 rounded-lg text-white">
              now
            </span>
          </h2>

          <p className="text-center mx-auto mt-8 sm:mt-12 text-base sm:text-lg max-w-xl text-balance px-4">
            <span className="font-semibold">
              Extract structured data in seconds!
            </span>{" "}
            Use our playground to test the API with your own text and schema.
          </p>

          <div
            id="api"
            className="w-full flex flex-col items-center mt-8 sm:mt-12 px-4"
          >
            <div className="relative max-w-[50rem] w-full text-left p-3 sm:p-5 bg-[#1e1e1e] rounded-xl shadow">
              <CodeSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
