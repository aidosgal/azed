import Link from "next/link";
import { nav } from "@/lib/content-ru";

function ArrowChip() {
  return (
    <span className="flex ml-3 mb-2">
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 9L9 3M9 3H4M9 3V8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 py-5">
      {/* Same container as the sections below, so the brand and CTA line up
          with the section content instead of sitting on the viewport edges. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link
          href="#hero"
          className="text-lg font-semibold text-foreground"
        >
          {nav.brand}
        </Link>
        <Link
          href="#contact"
          className="flex items-center font-semibold"
        >
          {nav.cta}
          <ArrowChip/>
        </Link>
      </div>
    </header>
  );
}
