import { Heart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-neutral-200 bg-white/75 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto lg:px-8 px-6">
        <div className="relative flex h-14 items-center justify-between">
          <Link
            href="/"
            className="relative inset-y-0 left-0 flex items-center font-semibold text-lg md:text-xl"
          >
            Structura.AI
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link className="hover:underline underline-offset-4" href="/#usecases">
              Use Cases
            </Link>
            <Link className="hover:underline underline-offset-4" href="/playground">
              Playground
            </Link>
            <Link className="hover:underline underline-offset-4" href="/#api">
              API
            </Link>
          </div>

          <Link
            href="https://github.com/ArjunCodess/structura"
            target="_blank"
            referrerPolicy="no-referrer"
            className={buttonVariants({ variant: "default" })}
          >
            Star on GitHub <Heart className="h-4 w-4 ml-1.5 fill-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;