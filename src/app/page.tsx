"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, Github } from "lucide-react";
import { RobotArm } from "@/components/visualizations/robot-arm";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SkillConstellation } from "@/components/visualizations/skill-constellation";
import { InteractiveTimeline } from "@/components/timeline/interactive-timeline";
import { ContactSection } from "@/components/layout/contact-section";
import { useLanguage } from "@/i18n/language-provider";

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-arm"><RobotArm /></div>
        <div className="container-wide hero-inner">
          <div className="hero-copy">
            <p className="section-index hero-status">{t.hero.status}</p>
            <h1 id="hero-title">{t.hero.name}</h1>
            <p className="hero-degree">{t.hero.degree}<br /><span>{t.hero.university}</span></p>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <Link href="#projects" className="hero-cta">{t.common.exploreProjects}<ArrowDownRight size={20} /></Link>
          </div>
          <div className="hero-bottom"><span>{t.hero.sequence}</span><span>001 / 004</span></div>
        </div>
      </section>
      <FeaturedProjects />
      <SkillConstellation />
      <InteractiveTimeline />
      <section className="outside-teaser section-block">
        <div className="container-wide outside-teaser__inner">
          <div><p className="section-index">/ 04 · PERSONAL</p><h2>{t.common.backgroundSignal}</h2></div>
          <div><p>{t.about.outside}</p><Link href="/about" className="text-link">{t.common.about}<ArrowRight size={17} /></Link></div>
          <div className="outside-teaser__motif" aria-hidden="true"><span>CAD</span><span>MECH</span><span>ELEC</span></div>
        </div>
      </section>
      <ContactSection />
      <footer className="container-wide site-footer"><span>DAVID GEIER / 2026</span><a href="https://github.com/davgei" target="_blank" rel="noreferrer" aria-label="David Geier on GitHub"><Github size={17} /></a></footer>
    </>
  );
}
