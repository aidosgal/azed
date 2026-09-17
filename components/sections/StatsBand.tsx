"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/content-ru";

/**
 * Full-bleed band of oversized numbers. Deliberately has no eyebrow or
 * heading — it's the scale jump that carries the section, and skipping the
 * usual header breaks the page's repeating rhythm.
 */
export function StatsBand() {
  return (
    <section className="relative border-y border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3">
        {about.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            className="border-b border-line px-6 py-12 last:border-b-0 sm:border-b-0 sm:border-r sm:px-10 sm:py-16 sm:last:border-r-0"
          >
            <div className="text-6xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              {stat.value}
            </div>
            <div className="mt-5 flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-muted">
              <span className="h-px w-5 bg-accent" />
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
