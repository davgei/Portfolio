"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { projectAreaNo, projects, type Project } from "@/data/projects";
import { useLanguage } from "@/i18n/language-provider";
import { ProjectVisual } from "./project-visual";

const stageNotes: Record<string, [string[], string[]]> = {
  "road-segmentation-unet": [
    ["Load paired KITTI road images and pixel masks.", "Resize images and masks to a consistent 256 x 256 input.", "Train a compact convolutional baseline for binary masks.", "Train a U-Net whose skip connections retain spatial detail.", "Compare validation loss and pixel accuracy while accounting for background imbalance."],
    ["Last inn KITTI-veibilder med tilh\u00f8rende pikselmasker.", "Skaler bilder og masker til en felles input p\u00e5 256 x 256.", "Tren en kompakt konvolusjonsbaseline for bin\u00e6re masker.", "Tren en U-Net der skip-forbindelser bevarer romlige detaljer.", "Sammenlign valideringstap og pikseln\u00f8yaktighet, og ta hensyn til ubalanse mellom vei og bakgrunn."]
  ],
  "waste-site-assessment": [
    ["Collect imagery and spatial context in the field.", "Find candidate objects in images.", "Check candidates against spatial information.", "Keep a human decision point in the loop.", "Present findings for inspection."],
    ["Samle inn bilder og romlig kontekst i felt.", "Finn kandidatobjekter i bilder.", "Sjekk kandidater mot romlig informasjon.", "Behold et menneskelig vurderingspunkt.", "Presenter funn for inspeksjon."]
  ],
  "ppo-autonomous-driving": [
    ["Read the simulator state.", "Choose a driving action from the policy.", "Evaluate the outcome through the reward signal.", "Update the policy from collected experience."],
    ["Les simulatortilstanden.", "Velg en kjørehandling fra policyen.", "Evaluer resultatet gjennom belønningssignalet.", "Oppdater policyen fra samlet erfaring."]
  ],
  "ros2-robot-control": [
    ["Define the desired state or path.", "Compute a control action from the error.", "Apply the action to the robot model.", "Read position and velocity for feedback."],
    ["Definer ønsket tilstand eller bane.", "Beregn en styrehandling fra avviket.", "Bruk handlingen på robotmodellen.", "Les posisjon og hastighet for tilbakekobling."]
  ],
  "mechatronic-prototyping": [
    ["Model individual mechanical parts.", "Combine parts in a CAD assembly.", "Test fit and movement constraints.", "Build and inspect a physical prototype."],
    ["Modeller mekaniske enkeltkomponenter.", "Kombiner delene i en CAD-sammenstilling.", "Undersøk passform og bevegelsesbegrensninger.", "Bygg og undersøk en fysisk prototype."]
  ],
  "camera-gps-acquisition": [
    ["Record 360 imagery.", "Record location information.", "Associate imagery with positions.", "Prepare material for inspection and processing."],
    ["Ta opp 360-bilder.", "Registrer posisjonsinformasjon.", "Knytt bildene til posisjoner.", "Klargjør materialet for inspeksjon og prosessering."]
  ]
};

export function ProjectDetailContent({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  const [activeStage, setActiveStage] = useState(0);
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  const notes = stageNotes[project.slug][language === "no" ? 1 : 0];
  const stages = language === "no" ? project.stagesNo : project.stages;

  return (
    <>
      <section className="project-detail-hero container-wide">
        <div className="project-detail-intro">
          <div className="section-index">/ {project.index} · {project.area.map((area) => language === "no" ? projectAreaNo[area] : area).join(" / ")}{project.date ? ` · ${project.date}` : ""}</div>
          <h1>{language === "no" ? project.titleNo : project.title}</h1>
          <p className="project-detail-subtitle">{language === "no" ? project.subtitleNo : project.subtitle}</p>
          <p className="project-detail-summary">{language === "no" ? project.summaryNo : project.summary}</p>
          <div className="project-tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
          {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer"><Github size={17} />{t.common.viewGithub}<ArrowUpRight size={16} /></a>}
        </div>
        <ProjectVisual project={project} />
      </section>

      <section className="container-readable case-narrative">
        <div className="case-chapter"><span>01 /</span><div><h2>{t.common.projectContext}</h2><p>{language === "no" ? project.contextNo : project.context}</p></div></div>
        <div className="case-chapter"><span>02 /</span><div><h2>{t.common.projectContribution}</h2><p>{language === "no" ? project.contributionNo : project.contribution}</p></div></div>
      </section>

      <section className="case-system section-block">
        <div className="container-wide">
          <div className="section-heading"><div><p className="section-index">/ SYSTEM</p><h2>{t.common.projectApproach}</h2></div><span className="system-disclaimer">{t.common.conceptual}</span></div>
          <div className="system-body">
            <div className="system-stages" role="group" aria-label={t.common.projectApproach}>
              {stages.map((stage, index) => <button key={stage} type="button" className={activeStage === index ? "system-stage is-active" : "system-stage"} aria-pressed={activeStage === index} onClick={() => setActiveStage(index)}><span>0{index + 1}</span><strong>{stage}</strong><ArrowRight size={17} aria-hidden="true" /></button>)}
            </div>
            <div className="system-explanation">
              <div className="system-readout" aria-live="polite"><span>0{activeStage + 1} / 0{stages.length}</span><p>{notes[activeStage]}</p></div>
              <p className="case-approach">{language === "no" ? project.approachNo : project.approach}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-readable case-narrative case-narrative--end">
        <div className="case-chapter"><span>03 /</span><div><h2>{t.common.projectOutcome}</h2><p>{language === "no" ? project.outcomeNo : project.outcome}</p></div></div>
        <div className="case-chapter"><span>04 /</span><div><h2>{t.common.projectNext}</h2><p>{language === "no" ? project.nextNo : project.next}</p></div></div>
      </section>
      <Link className="next-project container-wide" href={`/projects/${next.slug}`}><span>{t.common.nextProject} / {next.index}</span><strong>{language === "no" ? next.titleNo : next.title}</strong><ArrowUpRight size={32} /></Link>
    </>
  );
}
