"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectCard } from "./project-card";
import { RepositoryExplorer } from "./repository-explorer";

export function FeaturedProjects() {
  const { t } = useLanguage();
  return (
    <section id="projects" className="container-wide section-block">
      <div className="section-heading">
        <div><p className="section-index">/ 03 · WORK</p><h2>{t.common.selectedProjects}</h2></div>
        <div className="featured-heading-actions">
          <RepositoryExplorer />
          <Link href="/projects" className="text-link">{t.common.overview}<ArrowRight size={17} /></Link>
        </div>
      </div>
      <div className="featured-grid">
        {projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
