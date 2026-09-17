"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { pricing } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-0.5 shrink-0 text-accent"
      aria-hidden
    >
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        subheading={pricing.subheading}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricing.plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-accent/40 sm:p-8"
          >
            <span className="text-xs tracking-[0.2em] text-muted">
              {plan.index}
            </span>

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
              {plan.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {plan.description}
            </p>

            <div className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              {plan.price}
            </div>

            <ul className="mt-6 mb-8 space-y-3 border-t border-line pt-6">
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>

            {/* mt-auto keeps the CTA on the card's bottom edge even when the
                descriptions above wrap to different heights. */}
            <Link
              href="#contact"
              className="mt-auto rounded-full border border-line py-3 text-center text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {pricing.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">{pricing.note}</p>
    </section>
  );
}
