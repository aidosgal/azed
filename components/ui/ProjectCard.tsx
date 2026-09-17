/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { TagPill } from "./TagPill";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  type: "web" | "mobile";
  image?: string;
  url?: string;
  /** Larger case-study style: description sits on the card at rest instead of behind a hover reveal. */
  featured?: boolean;
  className?: string;
}

function ArrowChip() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors group-hover:border-accent group-hover:text-accent">
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 9L9 3M9 3H4M9 3V8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ProjectCard({
  title,
  description,
  tags,
  type,
  image,
  url,
  featured = false,
  className = "",
}: ProjectCardProps) {
  const initial = title.charAt(0);

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-background/40"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="schematic-grid absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-extrabold text-muted">{initial}</span>
        </div>
      )}

      <div className="absolute right-4 top-4">
        <ArrowChip />
      </div>

      {featured ? (
        /* Case-study style: description always on, no hover needed. */
        <div className="absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 sm:p-6">
          <span className="text-[10px] uppercase tracking-widest text-accent">
            {type === "web" ? "Web" : "Mobile"}
          </span>
          <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Resting state: image + small caption, visible until hover */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 via-black/20 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 group-hover:opacity-0">
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/60">
              {type === "web" ? "Web" : "Mobile"}
            </span>
          </div>

          {/* Hover state: black-opacity overlay with full info */}
          <div className="absolute inset-0 flex flex-col justify-end bg-black/85 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[10px] uppercase tracking-widest text-accent">
              {type === "web" ? "Web" : "Mobile"}
            </span>
            <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          </div>
        </>
      )}
    </motion.article>
  );

  if (!url) return <div className={className}>{card}</div>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {card}
    </a>
  );
}
