"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, MapPin, Phone } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { getBasePath } from "@/lib/utils";
import { CvActions } from "./cv-actions";

export function CvContent() {
  const { t, language } = useLanguage();
  const no = language === "no";
  const selectedProjects = projects.slice(0, 3);

  return (
    <div className="cv-page">
      <div className="container-wide cv-page__inner">
        <header className="cv-profile">
          <div className="cv-profile__copy">
            <p className="section-index">/ CV · DAVID BENEDICT GEIER</p>
            <h1>David Benedict Geier</h1>
            <p className="cv-profile__degree">{t.hero.degree}</p>
            <p className="cv-profile__university">{t.hero.university}</p>
            <p className="cv-profile__intro">{no
              ? "Jeg bygger praktiske løsninger i skjæringspunktet mellom kunstig intelligens, programvare og fysiske systemer. Fra å trene modeller til å teste hvordan de fungerer i virkeligheten."
              : "I build practical solutions where artificial intelligence, software and physical systems meet, from training models to testing how they work in the real world."}</p>
            <div className="cv-profile__meta"><span><MapPin size={15}/>{no ? "Oslo, Norge" : "Oslo, Norway"}</span><span>{no ? "AI · robotikk · systemutvikling" : "AI · robotics · systems engineering"}</span></div>
          </div>
          <div className="cv-profile__visual">
            <div className="cv-profile__portrait-wrap">
              <Image src={`${getBasePath()}/images/about/david-geier.jpeg`} alt={no ? "Portrett av David Benedict Geier" : "Portrait of David Benedict Geier"} width={600} height={592} priority className="cv-profile__portrait" />
            </div>
            <span className="cv-profile__visual-label">{no ? "INFORMATIKK / UIO" : "INFORMATICS / UIO"}</span>
            <CvActions />
          </div>
        </header>

        <section className="cv-snapshot" aria-label={no ? "Faglig oversikt" : "Professional overview"}>
          <div><span>01 / AI &amp; ML</span><strong>YOLOv8 · PointNet++ · PPO</strong></div>
          <div><span>02 / PERCEPTION</span><strong>{no ? "Datasyn · 3D · geodata" : "Computer vision · 3D · geospatial"}</strong></div>
          <div><span>03 / ROBOTICS</span><strong>ROS 2 · PID · Gazebo · CAD</strong></div>
        </section>

        <div className="cv-content-grid">
          <section className="cv-section cv-section--experience">
            <div className="cv-section__heading"><span>/ 01</span><h2>{t.cv.experience}</h2></div>
            <article className="cv-entry cv-entry--featured">
              <div className="cv-entry__top"><div><h3>{no ? "Oslo kommune · Renovasjons- og gjenvinningsetaten" : "Oslo Municipality · Waste Management Agency"}</h3><p className="cv-entry__role">{no ? "Praksis · maskinlæring og 3D-persepsjon" : "Internship · machine learning and 3D perception"}</p></div><span>2026</span></div>
              <p>{no ? "Utviklet og evaluerte arbeidsflyt for vurdering av hentesteder, fra bilde- og punktskydata til datasyn, geospatial analyse og et webgrensesnitt for kontroll." : "Developed and evaluated a collection-site assessment workflow, from image and point-cloud data to computer vision, geospatial analysis and a web review interface."}</p>
              <Link href="/projects/waste-site-assessment" className="cv-inline-link">{t.common.openProject}<ArrowUpRight size={15}/></Link>
            </article>
          </section>

          <section className="cv-section cv-section--education">
            <div className="cv-section__heading"><span>/ 02</span><h2>{t.cv.education}</h2></div>
            <div className="cv-entry-list">
              <article className="cv-entry"><div className="cv-entry__top"><h3>{t.hero.degree}</h3><span>{no ? "Pågående" : "Current"}</span></div><p>{t.hero.university}</p></article>
              <article className="cv-entry"><div className="cv-entry__top"><h3>{no ? "Bachelor i informatikk: robotikk og intelligente systemer" : "BSc Informatics: Robotics and Intelligent Systems"}</h3><span>2023–2026</span></div><p>{t.hero.university}</p></article>
              <article className="cv-entry"><div className="cv-entry__top"><h3>{no ? "Studiespesialisering" : "General studies"}</h3><span>2020–2023</span></div><p>{no ? "Lillestrøm videregående skole" : "Lillestrøm upper secondary school"}</p></article>
            </div>
          </section>

          <section className="cv-section cv-section--projects">
            <div className="cv-section__heading"><span>/ 03</span><h2>{t.cv.projects}</h2></div>
            <div className="cv-project-list">{selectedProjects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`} className="cv-project">
              <span className="cv-project__index">{project.index} / {no ? project.area.map((area) => area === "Perception" ? "Persepsjon" : area === "Learning" ? "Læring" : area === "Control" ? "Regulering" : area === "Hardware" ? "Maskinvare" : "Programvare").join(" · ") : project.area.join(" · ")}</span>
              <h3>{no ? project.titleNo : project.title}</h3><p>{no ? project.summaryNo : project.summary}</p><ArrowUpRight className="cv-project__arrow" size={18}/>
            </Link>)}</div>
          </section>

          <section className="cv-section cv-section--skills">
            <div className="cv-section__heading"><span>/ 04</span><h2>{t.cv.skills}</h2></div>
            <div className="cv-skills">
              <div><strong>AI / ML</strong><span>YOLOv8 · PointNet++ · PPO · model evaluation</span></div>
              <div><strong>{no ? "Datasyn og 3D" : "Vision and 3D"}</strong><span>{no ? "Bildeanalyse · punktskyer · geodata" : "Image analysis · point clouds · geospatial data"}</span></div>
              <div><strong>{no ? "Robotikk" : "Robotics"}</strong><span>ROS 2 · robot kinematics · PID · Gazebo</span></div>
              <div><strong>Prototyping</strong><span>SolidWorks · CAD · Raspberry Pi · 3D printing</span></div>
            </div>
          </section>
        </div>

        <section className="cv-contact">
          <div><p className="section-index">/ 05 · {no ? "TA KONTAKT" : "GET IN TOUCH"}</p><h2>{no ? "Skal vi lage noe sammen?" : "Let's build something useful."}</h2></div>
          <div className="cv-contact__links"><a href="mailto:davgei996@gmail.com"><Mail size={17}/>davgei996@gmail.com</a><a href="tel:+4748398237"><Phone size={17}/>+47 483 98 237</a><a href="https://github.com/davgei" target="_blank" rel="noreferrer"><Github size={17}/>github.com/davgei<ArrowUpRight size={14}/></a></div>
        </section>
      </div>
    </div>
  );
}
