"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projectAreas, projects, type ProjectArea } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectCard } from "./project-card";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

export function ProjectFilterGrid() {
  const [activeArea, setActiveArea] = useState<ProjectArea | "All">("All");
  const { t } = useLanguage();
  const { play } = useSound();

  const filteredProjects =
    activeArea === "All" ? projects : projects.filter((project) => project.area.includes(activeArea));

  return (
    <section className="container-wide py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase text-amber">{t.common.filterByArea}</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">{t.pages.projectsTitle}</h2>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-line bg-white/[0.035] p-2">
          {(["All", ...projectAreas] as Array<ProjectArea | "All">).map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => {
                setActiveArea(area);
                play("select");
              }}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm transition",
                activeArea === area ? "bg-amber text-ink" : "text-muted hover:text-mist"
              )}
            >
              {area === "All" ? t.common.all : area}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
