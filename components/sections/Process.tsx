"use client";

import { motion } from "framer-motion";
import { workflow } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-32"
    >
      <SectionHeading
        eyebrow={workflow.eyebrow}
        heading={workflow.heading}
        subheading={workflow.subheading}
      />

      {/* The in-view trigger lives on this container, not on the trace itself:
          a line scaled to 0 has zero area, and a zero-area element never
          reports as intersecting, so it would never animate. Children pick up
          the state through framer-motion's variant context. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mt-16"
      >
        {/* The trace draws itself as the section scrolls in. Separate elements
            per orientation, since scaleX/scaleY can't be switched per breakpoint. */}
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="absolute left-[7px] top-2 bottom-2 w-px bg-line lg:hidden"
        />
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="absolute left-0 right-0 top-[7px] hidden h-px bg-line lg:block"
        />

        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {workflow.steps.map((step, i) => (
            <motion.div
              key={step.index}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.14,
                ease: "easeOut",
              }}
              className="relative pl-10 lg:pl-0"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line bg-background lg:relative"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              {/* Oversized outlined numeral instead of a small muted label. */}
              <span className="text-outline-muted block text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:mt-8">
                {step.index}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
