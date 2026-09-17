"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

        {/* Lead paragraph runs at display size, the rest drops back to body
            copy — gives this section its own typographic shape. */}
        <p className="mt-10 max-w-4xl text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {about.body[0]}
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {about.body[1]}
          </p>

          <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
            {about.benefits.map((benefit) => (
              <TagPill key={benefit} label={benefit} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
