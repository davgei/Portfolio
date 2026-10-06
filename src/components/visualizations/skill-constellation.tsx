"use client";

import { motion } from "framer-motion";
import { skillClusters } from "@/data/skills";
import { useLanguage } from "@/i18n/language-provider";

export function SkillConstellation() {
  const { t } = useLanguage();

  return (
    <section className="container-wide py-20">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase text-amber">/ 03</p>
        <h2 className="mt-3 text-4xl font-semibold text-mist">{t.common.technicalAreas}</h2>
      </div>
      <div className="relative grid gap-5 overflow-hidden rounded-lg border border-line bg-white/[0.03] p-5 md:grid-cols-3 md:p-8">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-50" aria-hidden="true">
          <path d="M120 120 C360 36 520 260 820 120 S1120 300 1360 128" fill="none" stroke="#d8a545" strokeOpacity=".24" strokeWidth="1.5" />
          <path d="M88 310 C340 420 580 240 780 360 S1090 260 1360 410" fill="none" stroke="#8adce7" strokeOpacity=".16" strokeWidth="1.5" />
        </svg>
        {skillClusters.map((cluster, index) => (
          <motion.article
            key={cluster.title}
            whileHover={{ scale: 1.025 }}
            className={`relative z-10 rounded-lg border border-line bg-ink/74 p-5 backdrop-blur ${cluster.position}`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-amber/40 font-mono text-xs text-amber">
                0{index + 1}
              </span>
              <h3 className="text-xl font-semibold text-mist">{cluster.title}</h3>
            </div>
            <p className="text-sm leading-6 text-muted">{cluster.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cluster.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-mist">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
