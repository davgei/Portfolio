"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { CvActions } from "./cv-actions";
import { useLanguage } from "@/i18n/language-provider";
import { projects } from "@/data/projects";

export function CvContent() {
  const { t, language } = useLanguage();
  return (
    <div className="cv-page container-readable">
      <header className="cv-header"><div><p className="section-index">/ CV · DAVID GEIER</p><h1>David Geier</h1><p>{t.hero.degree}</p><span>{t.hero.university}</span></div><CvActions /></header>
      <div className="cv-rule" />
      <section className="cv-section"><h2>{t.cv.education}</h2><div className="cv-entry"><div><h3>{t.hero.degree}</h3><p>{t.hero.university}</p></div><span>{language === "no" ? "Pågående" : "Current"}</span></div><div className="cv-entry"><div><h3>{language === "no" ? "Bachelorstudier i informatikk / robotikk" : "Bachelor-level informatics / robotics"}</h3><p>{t.hero.university}</p><small>{t.cv.verify}</small></div></div></section>
      <section className="cv-section"><h2>{t.cv.experience}</h2><div className="cv-entry"><div><h3>{language === "no" ? "Oslo kommune / REG · prosjektarbeid" : "Oslo Municipality / REG · project work"}</h3><p>{language === "no" ? "Datainnsamling, datasyn, 3D-verifisering og visualisering for vurdering av renovasjonsanlegg." : "Data acquisition, computer vision, 3D verification and visualization for waste collection site assessment."}</p><Link href="/projects/waste-site-assessment" className="cv-inline-link">{t.common.openProject}<ArrowUpRight size={14}/></Link></div><span>2026</span></div></section>
      <section className="cv-section"><h2>{t.cv.projects}</h2>{projects.slice(1, 4).map((project) => <div key={project.slug} className="cv-entry"><div><h3>{language === "no" ? project.titleNo : project.title}</h3><p>{language === "no" ? project.summaryNo : project.summary}</p><Link href={`/projects/${project.slug}`} className="cv-inline-link">{t.common.openProject}<ArrowUpRight size={14}/></Link></div></div>)}</section>
      <section className="cv-section"><h2>{t.cv.skills}</h2><div className="cv-skills"><p><strong>{language === "no" ? "Persepsjon" : "Perception"}</strong>Computer vision · 2D detection · Point clouds</p><p><strong>{language === "no" ? "Læring" : "Learning"}</strong>PPO · Reinforcement learning · Model evaluation</p><p><strong>{language === "no" ? "Regulering" : "Control"}</strong>ROS 2 · Joint states · Feedback control</p><p><strong>{language === "no" ? "Maskinvare" : "Hardware"}</strong>SolidWorks · CAD assemblies · Raspberry Pi · GPS</p></div></section>
      <section className="cv-section cv-contact"><h2>{t.nav.contact}</h2><a href="https://github.com/davgei" target="_blank" rel="noreferrer"><Github size={17}/> github.com/davgei <ArrowUpRight size={14}/></a></section>
    </div>
  );
}
