"use client";

import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="container-wide py-20">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase text-amber">/ 02</p>
          <h2 className="mt-3 text-4xl font-semibold text-mist">{t.common.selectedProjects}</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Short previews for deeper technical writeups, demos and engineering notes.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} large={index === 0} />
        ))}
      </div>
    </section>
  );
}
