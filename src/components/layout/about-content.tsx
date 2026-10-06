"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "./contact-section";
import { useLanguage } from "@/i18n/language-provider";

export function AboutContent() {
  const { t, language } = useLanguage();
  return (
    <>
      <section className="container-wide about-hero"><p className="section-index">/ ABOUT · DAVID GEIER</p><h1>{t.about.statement}</h1><div className="about-hero__lower"><p>{t.pages.aboutIntro}</p><span aria-hidden="true">P / L / C / H</span></div></section>
      <section className="about-body container-wide"><div className="about-body__statement"><p className="section-index">/ APPROACH</p><h2>{language === "no" ? "Fra data til handling" : "From data to action"}</h2><p>{t.about.body}</p></div><div className="about-body__notes"><div><span>01 /</span><h3>{t.about.methodTitle}</h3><p>{t.about.method}</p></div><div><span>02 /</span><h3>{t.about.interestTitle}</h3><p>{t.about.interest}</p></div></div></section>
      <section className="about-project-band"><div className="container-wide"><p className="section-index">/ IN PRACTICE</p><h2>{language === "no" ? "Arbeid på tvers av fagfelt" : "Work across disciplines"}</h2><div className="about-project-links"><Link href="/projects/waste-site-assessment">01 / {language === "no" ? "Datasyn og 3D-persepsjon" : "Vision and 3D perception"}<ArrowUpRight size={20}/></Link><Link href="/projects/ppo-autonomous-driving">02 / {language === "no" ? "Læring og autonomi" : "Learning and autonomy"}<ArrowUpRight size={20}/></Link><Link href="/projects/mechatronic-prototyping">03 / {language === "no" ? "CAD og prototyping" : "CAD and prototyping"}<ArrowUpRight size={20}/></Link></div></div></section>
      <ContactSection />
    </>
  );
}
