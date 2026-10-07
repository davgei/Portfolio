"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "./contact-section";
import { useLanguage } from "@/i18n/language-provider";
import { getBasePath } from "@/lib/utils";

export function AboutContent() {
  const { t, language } = useLanguage();
  const no = language === "no";

  return (
    <>
      <section className="container-wide about-hero">
        <p className="section-index">/ ABOUT · DAVID BENEDICT GEIER</p>
        <h1>{t.about.statement}</h1>
        <div className="about-hero__lower">
          <p>{no ? "Jeg studerer informatikk: robotikk og intelligente systemer ved Universitetet i Oslo. Det som interesserer meg mest, er hvordan data, AI, programvare og mekanikk kan bli ett nyttig system." : "I study Informatics: Robotics and Intelligent Systems at the University of Oslo. What interests me most is how data, AI, software and mechanics can become one useful system."}</p>
          <Image className="about-page__portrait" src={`${getBasePath()}/images/about/david-geier.jpeg`} alt={no ? "Portrett av David Benedict Geier" : "Portrait of David Benedict Geier"} width={300} height={296} priority />
        </div>
      </section>

      <section className="about-story container-wide">
        <div className="about-story__heading"><p className="section-index">/ {no ? "BAKGRUNN" : "BACKGROUND"}</p><h2>{no ? "Fra modell til virkelighet." : "From model to reality."}</h2></div>
        <div className="about-story__text">
          <p>{no ? "Jeg fullførte bachelor i informatikk: robotikk og intelligente systemer i 2026 og har begynt på master i samme fagfelt. Studiene har gitt meg erfaring med maskinlæring, bildeanalyse, robotdynamikk, kinematikk, regulering, mikroelektronikk og programmering. Jeg liker AI like mye som robotene den kan styre: hvordan modeller trenes, evalueres og brukes på data fra den virkelige verden." : "I completed a bachelor's degree in Informatics: Robotics and Intelligent Systems in 2026 and have started a master's in the same field. My studies span machine learning, image analysis, robot dynamics, kinematics, control, microelectronics and programming. I am as interested in AI as in the robots it can control: how models are trained, evaluated and applied to real-world data."}</p>
          <p>{no ? "Sommeren 2026 jobbet jeg hos Oslo kommunes Renovasjons- og gjenvinningsetat. Der utviklet og evaluerte jeg løsninger for å kartlegge hentesteder med datasyn og 3D-persepsjon. Arbeidet strakte seg fra innsamling og behandling av bilde- og punktskydata til modeller, backend, geospatial analyse og et webgrensesnitt for kontroll. Det lærte meg hvor viktig det er at en ML-løsning også fungerer som et helt system." : "In summer 2026 I worked with Oslo Municipality's waste management agency. I developed and evaluated ways to assess collection sites with computer vision and 3D perception. The work ranged from image and point-cloud data to models, backend services, geospatial analysis and a web interface for review. It showed me why an ML model only matters when the surrounding system works too."}</p>
        </div>
      </section>

      <section className="about-personal">
        <div className="container-wide about-personal__inner">
          <div><p className="section-index">/ {no ? "SAMARBEID OG FRITID" : "WORKING WITH OTHERS"}</p><h2>{no ? "Nysgjerrig, praktisk og glad i folk." : "Curious, practical and people-oriented."}</h2></div>
          <div>
            <p>{no ? "Jeg trives med prosjektarbeid i team og liker å diskutere ideer høyt, men jobber også gjerne selvstendig når en vanskelig oppgave trenger konsentrasjon. Jeg prøver å ta ansvar for hele veien fra første prototype til noe som er forståelig og brukbart for andre." : "I enjoy building things in teams and talking through ideas, but I am also happy working independently when a difficult problem needs concentration. I try to take responsibility for the path from first prototype to something understandable and useful to others."}</p>
            <p>{no ? "På fritiden spiller jeg ishockey og i band, skrur på en gammel Porsche og motorsykkel, og eksperimenterer med 3D-printing, Arduino og Raspberry Pi. De interessene holder meg tett på materialer, begrensninger og praktisk problemløsning." : "Outside university I play ice hockey and in a band, work on an old Porsche and motorcycle, and experiment with 3D printing, Arduino and Raspberry Pi. Those interests keep me close to materials, constraints and practical problem-solving."}</p>
          </div>
        </div>
      </section>

      <section className="about-work-band"><div className="container-wide about-work-band__inner"><div><p className="section-index">/ {no ? "SE ARBEIDET" : "SEE THE WORK"}</p><h2>{no ? "Prosjektene viser detaljene." : "The projects show the details."}</h2></div><Link href="/#projects" className="text-link">{no ? "Til utvalgte prosjekter" : "Explore selected work"}<ArrowUpRight size={18} /></Link></div></section>
      <ContactSection />
    </>
  );
}
