"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow={services.eyebrow}
        heading={services.heading}
        subheading={services.subheading}
      />

      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="group border-t border-line pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] text-muted">
                {service.index}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Reserved height so a two-line title doesn't push its description
                out of line with the neighbouring columns. */}
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground lg:min-h-14">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-xs text-muted"
                >
                  <span className="h-px w-3 shrink-0 bg-line" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
