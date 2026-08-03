import { projects } from "@/lib/content-ru";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow={projects.eyebrow}
        heading={projects.heading}
        subheading={projects.subheading}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            type={project.type}
          />
        ))}
      </div>
    </section>
  );
}
