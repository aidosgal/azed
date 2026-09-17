import { ticker } from "@/lib/content-ru";

/**
 * Full-bleed scrolling band that deliberately breaks the page's centered
 * column, so the eye gets something other than "heading + grid" between
 * sections. Decorative and duplicated for the seamless loop, hence
 * aria-hidden — screen readers would otherwise read the list twice.
 */
export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line py-5 sm:py-7"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {ticker.map((word, i) => (
              <div key={`${copy}-${word}`} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-6 text-2xl uppercase tracking-tight sm:px-10 sm:text-4xl ${
                    i % 2 === 1 ? "text-outline" : "text-foreground"
                  }`}
                >
                  {word}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
