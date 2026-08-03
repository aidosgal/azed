"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCallout } from "@/components/ui/StatCallout";
import { TagPill } from "@/components/ui/TagPill";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-5xl px-6 py-32 sm:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4">
            {about.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {about.stack.map((tech) => (
                <TagPill key={tech} label={tech} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1">
            {about.stats.map((stat) => (
              <StatCallout key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
