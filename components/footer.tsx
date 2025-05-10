import { Github, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">Structura.AI</h2>
            <p className="mt-1 text-sm text-neutral-600 max-w-sm">
              Extract structured data from any text with our powerful API and interactive playground.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/arjuncodess"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-neutral-300 p-2 hover:bg-neutral-100 transition"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5 text-neutral-600 group-hover:text-black transition" />
            </Link>
            <Link
              href="https://github.com/ArjunCodess/structura"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-neutral-300 p-2 hover:bg-neutral-100 transition"
            >
              <span className="sr-only">Github</span>
              <Github className="h-5 w-5 text-neutral-600 group-hover:text-black transition" />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Structura.AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;