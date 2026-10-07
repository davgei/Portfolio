"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Mail, Phone } from "lucide-react";
import { CvActions } from "./cv-actions";
import { useLanguage } from "@/i18n/language-provider";
import { projects } from "@/data/projects";

export function CvContent() {
  const { t, language } = useLanguage();
  const no = language === "no";
  return (
    <div className="cv-page container-readable">
      <header className="cv-header"><div><p className="section-index">/ CV · DAVID BENEDICT GEIER</p><h1>David Benedict Geier</h1><p>{t.hero.degree}</p><span>{t.hero.university}</span></div><CvActions /></header>
      <div className="cv-rule" />
      <section className="cv-section"><h2>{t.cv.education}</h2><div>
        <div className="cv-entry"><div><h3>{t.hero.degree}</h3><p>{t.hero.university}</p></div><span>{no ? "Pågående" : "Current"}</span></div>
        <div className="cv-entry"><div><h3>{no ? "Bachelor i informatikk: robotikk og intelligente systemer" : "BSc Informatics: Robotics and Intelligent Systems"}</h3><p>{t.hero.university}</p></div><span>2023–2026</span></div>
        <div className="cv-entry"><div><h3>{no ? "Realfag" : "Science studies"}</h3><p>{no ? "Lillestrøm videregående skole" : "Lillestrøm upper secondary school"}</p></div><span>2020–2023</span></div>
      </div></section>
      <section className="cv-section"><h2>{t.cv.experience}</h2><div className="cv-entry"><div><h3>{no ? "Oslo kommune / REG · praksis" : "Oslo Municipality / REG · internship"}</h3><p>{no ? "Utviklet en full-stack ML-løsning med datasyn, 3D-persepsjon, geospatial analyse og webbasert GIS/3D-visualisering." : "Built a full-stack ML workflow with computer vision, 3D perception, geospatial analysis and web-based GIS/3D visualization."}</p><Link href="/projects/waste-site-assessment" className="cv-inline-link">{t.common.openProject}<ArrowUpRight size={14}/></Link></div><span>2026</span></div></section>
      <section className="cv-section"><h2>{t.cv.projects}</h2><div>{projects.slice(1, 4).map((project) => <div key={project.slug} className="cv-entry"><div><h3>{no ? project.titleNo : project.title}</h3><p>{no ? project.summaryNo : project.summary}</p><Link href={`/projects/${project.slug}`} className="cv-inline-link">{t.common.openProject}<ArrowUpRight size={14}/></Link></div></div>)}</div></section>
      <section className="cv-section"><h2>{t.cv.skills}</h2><div className="cv-skills"><p><strong>AI / ML</strong>YOLOv8 · PointNet++ · PPO · model evaluation</p><p><strong>{no ? "Persepsjon" : "Perception"}</strong>Computer vision · 3D point clouds · geospatial data</p><p><strong>{no ? "Regulering" : "Control"}</strong>Robot kinematics · PID · Gazebo · ROS 2</p><p><strong>{no ? "Maskinvare" : "Hardware"}</strong>SolidWorks · CAD · Raspberry Pi · 3D printing</p></div></section>
      <section className="cv-section cv-contact"><h2>{t.nav.contact}</h2><div><a href="mailto:davgei996@gmail.com"><Mail size={17}/> davgei996@gmail.com</a><a href="tel:+4748398237"><Phone size={17}/> +47 483 98 237</a><a href="https://github.com/davgei" target="_blank" rel="noreferrer"><Github size={17}/> github.com/davgei <ArrowUpRight size={14}/></a></div></section>
    </div>
  );
}
