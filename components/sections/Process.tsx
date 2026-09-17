"use client";

import { motion } from "framer-motion";
import { workflow } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow={workflow.eyebrow}
        heading={workflow.heading}
        subheading={workflow.subheading}
      />

      <div className="relative mt-16">
        {/* Trace connecting the step nodes: horizontal on wide screens, vertical below. */}
        <span
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-line lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto"
        />

        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {workflow.steps.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative pl-10 lg:pl-0"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line bg-background lg:relative"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <span className="block text-xs tracking-[0.2em] text-muted lg:mt-6">
                {step.index}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
