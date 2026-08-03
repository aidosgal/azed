import Link from "next/link";
import { nav } from "@/lib/content-ru";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link
        href="#hero"
        className="text-sm font-extrabold uppercase tracking-[0.2em] text-foreground"
      >
        {nav.brand}
      </Link>
      <Link
        href="#contact"
        className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {nav.cta}
      </Link>
    </header>
  );
}
