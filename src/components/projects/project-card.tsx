"use client";

import Image from "next/image";
import Link from "next/link";
import { ScanSearch } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export function ProjectCard({ project, priority = false, large = false }: { project: Project; priority?: boolean; large?: boolean }) {
  const { t } = useLanguage();
  const { play } = useSound();

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={large ? "md:col-span-2" : ""}
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={() => play("navigate")}
        className="group block overflow-hidden rounded-lg border border-line bg-white/[0.035] shadow-hairline"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-panel">
          <Image
            src={project.image}
            alt=""
            fill
            priority={priority}
            className="object-cover opacity-82 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line bg-ink/72 text-mist backdrop-blur">
            <ScanSearch size={18} />
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {project.area.slice(0, 3).map((area) => (
              <span key={area} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                {area}
              </span>
            ))}
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-mist">{project.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{project.summary}</p>
            </div>
            <span className="hidden rounded-full bg-amber/12 px-3 py-1 font-mono text-xs text-amber sm:inline-flex">{project.metric}</span>
          </div>
          <span className="mt-5 inline-flex text-sm font-semibold text-amber">{t.common.openProject}</span>
        </div>
      </Link>
    </motion.article>
  );
}
