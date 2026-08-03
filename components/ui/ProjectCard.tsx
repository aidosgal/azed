"use client";

import { motion } from "framer-motion";
import { DeviceMockupFrame } from "./DeviceMockupFrame";
import { TagPill } from "./TagPill";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  type: "web" | "mobile";
}

export function ProjectCard({ title, description, tags, type }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-background/40 p-5 transition-colors hover:border-accent/60"
    >
      <div className="h-40">
        <DeviceMockupFrame type={type} title={title} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-muted">
          {type === "web" ? "Web" : "Mobile"}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </motion.article>
  );
}
