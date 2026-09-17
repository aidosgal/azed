import { projects } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

/**
 * Bento-style span/height per card instead of a uniform 3-up grid — spans
 * are in a 5-column grid and sum to 5 within each visual row so cards wrap
 * cleanly: [3+2] then [2+3].
 */
const layout = [
  { span: "sm:col-span-3", height: "h-[320px] sm:h-[440px]", featured: true },
  { span: "sm:col-span-2", height: "h-[320px] sm:h-[440px]", featured: false },
  { span: "sm:col-span-2", height: "h-[280px] sm:h-[340px]", featured: false },
  { span: "sm:col-span-3", height: "h-[280px] sm:h-[340px]", featured: true },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-32"
    >
      <SectionHeading
        eyebrow={projects.eyebrow}
        heading={projects.heading}
        subheading={projects.subheading}
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-5">
        {projects.items.map((project, i) => {
          const { span, height, featured } = layout[i % layout.length];
          return (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              type={project.type}
              image={project.image}
              url={project.url}
              featured={featured}
              className={`${span} ${height}`}
            />
          );
        })}
      </div>
    </section>
  );
}
