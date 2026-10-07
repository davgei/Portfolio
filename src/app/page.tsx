"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, Github } from "lucide-react";
import { RobotArm } from "@/components/visualizations/robot-arm";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SkillConstellation } from "@/components/visualizations/skill-constellation";
import { InteractiveTimeline } from "@/components/timeline/interactive-timeline";
import { ContactSection } from "@/components/layout/contact-section";
import { AboutPreview } from "@/components/layout/about-preview";
import { SectionRail } from "@/components/navigation/section-rail";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export default function Home() {
  const { t, language } = useLanguage();
  const { play } = useSound();
  return (
    <div className="home-page">
      <SectionRail />
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-arm"><RobotArm /></div>
        <div className="container-wide hero-inner">
          <div className="hero-copy">
            <p className="section-index hero-status">{t.hero.status}</p>
            <h1 id="hero-title">{t.hero.name}</h1>
            <p className="hero-degree">{t.hero.degree}<br /><span>{t.hero.university}</span></p>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <Link href="#projects" onClick={() => play("navigate")} className="hero-cta">{t.common.exploreProjects}<ArrowDownRight size={20} /></Link>
          </div>
          <div className="hero-console" aria-label={t.common.exploreProjects}>
            <span className="hero-console__caption">/ {language === "no" ? "VELG DESTINASJON" : "SELECT DESTINATION"}</span>
            <a href="#about-preview" onClick={() => play("navigate")}>01 <strong>{language === "no" ? "Om meg" : "About"}</strong><ArrowRight size={16} /></a>
            <a href="#projects" onClick={() => play("navigate")}>02 <strong>{language === "no" ? "Prosjekter" : "Work"}</strong><ArrowRight size={16} /></a>
            <a href="#systems" onClick={() => play("navigate")}>03 <strong>{language === "no" ? "AI og systemer" : "AI & systems"}</strong><ArrowRight size={16} /></a>
          </div>
          <div className="hero-bottom"><span>{t.hero.sequence}</span><span>001 / 006</span></div>
        </div>
      </section>
      <AboutPreview />
      <FeaturedProjects />
      <SkillConstellation />
      <InteractiveTimeline />
      <ContactSection />
      <footer className="container-wide site-footer"><span>{language === "no" ? "NETTSIDE OG DESIGN AV" : "WEBSITE & DESIGN BY"} DAVID BENEDICT GEIER / 2026</span><a href="https://github.com/davgei" target="_blank" rel="noreferrer" aria-label="David Benedict Geier on GitHub"><Github size={17} /></a></footer>
    </div>
  );
}
