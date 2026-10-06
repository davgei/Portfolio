"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "./contact-section";
import { useLanguage } from "@/i18n/language-provider";
import { getBasePath } from "@/lib/utils";

export function AboutContent() {
  const { t, language } = useLanguage();
  return (
    <>
      <section className="container-wide about-hero"><p className="section-index">/ ABOUT · DAVID GEIER</p><h1>{t.about.statement}</h1><div className="about-hero__lower"><p>{t.pages.aboutIntro}</p><Image className="about-page__portrait" src={`${getBasePath()}/images/about/david-geier.jpeg`} alt={language === "no" ? "Portrett av David Geier" : "Portrait of David Geier"} width={300} height={296} /></div></section>
      <section className="about-body container-wide"><div className="about-body__statement"><p className="section-index">/ APPROACH</p><h2>{language === "no" ? "Fra data til handling" : "From data to action"}</h2><p>{t.about.body}</p></div><div className="about-body__notes"><div><span>01 /</span><h3>{t.about.methodTitle}</h3><p>{t.about.method}</p></div><div><span>02 /</span><h3>{t.about.interestTitle}</h3><p>{t.about.interest}</p></div></div></section>
      <section className="about-personal"><div className="container-wide about-personal__inner"><div><p className="section-index">/ {language === "no" ? "UTENFOR LABEN" : "OUTSIDE THE LAB"}</p><h2>{language === "no" ? "Hender, hode og lagspill." : "Hands, head and teamwork."}</h2></div><div><p>{language === "no" ? "Jeg er en nysgjerrig altmuligmann med mange hobbyer. Jeg spiller ishockey og i band, skrur på veteranbil og motorsykkel, og eksperimenterer med 3D-printing, Arduino og Raspberry Pi." : "I am a curious generalist with many interests. I play ice hockey and in a band, work on a classic car and motorcycle, and experiment with 3D printing, Arduino and Raspberry Pi."}</p><p>{language === "no" ? "Jeg trives i prosjektteam, men liker også perioder med dyp konsentrasjon når et vanskelig problem skal knekkes." : "I enjoy project teamwork and also the focused stretches it takes to solve a difficult problem."}</p></div></div></section>
      <section className="about-project-band"><div className="container-wide"><p className="section-index">/ IN PRACTICE</p><h2>{language === "no" ? "Arbeid på tvers av fagfelt" : "Work across disciplines"}</h2><div className="about-project-links"><Link href="/projects/waste-site-assessment">01 / {language === "no" ? "Datasyn og 3D-persepsjon" : "Vision and 3D perception"}<ArrowUpRight size={20}/></Link><Link href="/projects/ppo-autonomous-driving">02 / {language === "no" ? "Læring og autonomi" : "Learning and autonomy"}<ArrowUpRight size={20}/></Link><Link href="/projects/mechatronic-prototyping">03 / {language === "no" ? "CAD og prototyping" : "CAD and prototyping"}<ArrowUpRight size={20}/></Link></div></div></section>
      <ContactSection />
    </>
  );
}
