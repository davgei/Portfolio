"use client";

import { useState } from "react";
import { projectAreaNo, projectAreas, projects, type ProjectArea } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectCard } from "./project-card";

export function ProjectFilterGrid() {
  const [activeArea, setActiveArea] = useState<ProjectArea | "All">("All");
  const { t, language } = useLanguage();
  const filtered = activeArea === "All" ? projects : projects.filter((project) => project.area.includes(activeArea));
  return (
    <section className="container-wide section-block project-index">
      <div className="filter-row" aria-label={t.common.filterByArea}>
        {(["All", ...projectAreas] as Array<ProjectArea | "All">).map((area) => (
          <button key={area} type="button" aria-pressed={activeArea === area} onClick={() => setActiveArea(area)} className={activeArea === area ? "filter-button is-active" : "filter-button"}>
            {area === "All" ? t.common.all : language === "no" ? projectAreaNo[area] : area}
          </button>
        ))}
      </div>
      <div className="featured-grid">
        {filtered.map((project, index) => <ProjectCard key={project.slug} project={project} large={index === 0 && activeArea === "All"} />)}
      </div>
    </section>
  );
}
