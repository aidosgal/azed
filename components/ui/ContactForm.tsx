"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content-ru";

/**
 * Presentational only — there is no backend/email service wired up, so
 * submitting builds a mailto: link pre-filled with the message and hands
 * off to the user's mail client instead of making a network call.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Проект от ${name || "сайта"}`);
    const body = encodeURIComponent(
      `${message}\n\nОт: ${name}\nEmail для ответа: ${email}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
          {contact.form.nameLabel}
        </label>
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={contact.form.namePlaceholder}
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
          {contact.form.emailLabel}
        </label>
        <input
          type="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={contact.form.emailPlaceholder}
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
          {contact.form.messageLabel}
        </label>
        <textarea
          className={`${inputClass} min-h-32 resize-none`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={contact.form.messagePlaceholder}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {contact.form.submit}
      </button>
    </form>
  );
}
