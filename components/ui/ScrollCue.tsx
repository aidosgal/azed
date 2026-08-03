"use client";

import { motion } from "framer-motion";

export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
      <span>{label}</span>
      <motion.span
        aria-hidden
        className="h-8 w-px bg-line"
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
