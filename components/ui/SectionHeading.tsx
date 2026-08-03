interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
          {subheading}
        </p>
      )}
    </div>
  );
}
