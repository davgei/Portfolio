"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectAreaNo, type Project } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const { language, t } = useLanguage();
  return (
    <article className={`project-card ${large ? "project-card--large" : ""}`}>
      <Link href={`/projects/${project.slug}`} className="project-card__link" aria-label={`${t.common.openProject}: ${language === "no" ? project.titleNo : project.title}`}>
        <ProjectVisual project={project} compact={!large} />
        <div className="project-card__body">
          <div className="project-card__meta"><span>{project.index} / {project.area.map((area) => language === "no" ? projectAreaNo[area] : area).join(" · ")}</span><ArrowUpRight size={21} aria-hidden="true" /></div>
          <h3>{language === "no" ? project.titleNo : project.title}</h3>
          <p>{language === "no" ? project.summaryNo : project.summary}</p>
          <span className="project-card__cta">{t.common.openProject} <ArrowUpRight size={15} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
