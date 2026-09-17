"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faq } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10">
      <SectionHeading
        eyebrow={faq.eyebrow}
        heading={faq.heading}
        subheading={faq.subheading}
      />

      <div className="mt-14 border-t border-line">
        {faq.items.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={item.question} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              >
                <span className="text-base text-foreground transition-colors group-hover:text-accent sm:text-lg">
                  {item.question}
                </span>

                {/* Plus that rotates into a minus when the row is open. */}
                <span
                  aria-hidden
                  className="relative h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      isOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
