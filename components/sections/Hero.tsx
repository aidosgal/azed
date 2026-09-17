"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { hero } from "@/lib/content-ru";
import { ScrollCue } from "@/components/ui/ScrollCue";

export function Hero() {
  const headlineLines = hero.headline.split("\n");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between pt-32 pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto my-auto w-full max-w-6xl px-6 sm:px-10"
      >
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-6 bg-accent" />
          {hero.eyebrow}
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          {hero.subheadline}
        </p>
        <Link
          href="#contact"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {hero.primaryCta}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mx-auto"
      >
        <ScrollCue label={hero.scrollCue} />
      </motion.div>
    </section>
  );
}
