"use client";

import Link from "next/link";
import { Compass, Send } from "lucide-react";
import { motion } from "framer-motion";
import { RobotArm } from "@/components/visualizations/robot-arm";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SkillConstellation } from "@/components/visualizations/skill-constellation";
import { InteractiveTimeline } from "@/components/timeline/interactive-timeline";
import { ContactSection } from "@/components/layout/contact-section";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export default function Home() {
  const { t } = useLanguage();
  const { play } = useSound();

  return (
    <>
      <section className="container-wide grid min-h-[calc(100vh-6rem)] gap-8 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 font-mono text-xs uppercase text-amber">{t.hero.university}</p>
          <h1 className="max-w-4xl text-balance text-6xl font-semibold leading-[0.95] text-mist sm:text-7xl xl:text-8xl">
            {t.hero.name}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-mist/85">{t.hero.degree}</p>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">{t.hero.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              onClick={() => play("navigate")}
              className="group inline-flex items-center gap-3 rounded-full border border-amber/60 bg-amber px-5 py-3 font-semibold text-ink transition hover:bg-mist"
            >
              <Compass size={18} />
              {t.common.exploreProjects}
            </Link>
            <Link href="/about" onClick={() => play("navigate")} className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-mist transition hover:border-mist">
              {t.common.about}
            </Link>
            <a href="#contact" onClick={() => play("navigate")} className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-mist transition hover:border-mist">
              <Send size={17} />
              {t.common.contact}
            </a>
          </div>
        </motion.div>
        <RobotArm />
      </section>

      <FeaturedProjects />
      <SkillConstellation />
      <InteractiveTimeline />
      <section className="container-readable py-16">
        <div className="rounded-lg border border-line bg-white/[0.035] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase text-amber">/ 04</p>
          <h2 className="mt-3 text-3xl font-semibold text-mist">{t.common.backgroundSignal}</h2>
          <p className="mt-4 leading-7 text-muted">
            {t.common.placeholders}: education, engineering approach, experience and selected technical interests.
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
