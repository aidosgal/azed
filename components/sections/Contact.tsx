"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid gap-12 md:grid-cols-2"
      >
        <div>
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} />
          <p className="mt-4 max-w-sm text-base text-muted sm:text-lg">
            {contact.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="w-fit border-b border-transparent text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {contact.email}
            </a>
            <span className="text-muted">{contact.telegram}</span>
          </div>
        </div>

        <ContactForm />
      </motion.div>

      <div className="mt-24 border-t border-line pt-6 text-xs text-muted">
        {contact.footer}
      </div>
    </section>
  );
}
