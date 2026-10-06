export type TimelineItem = {
  id: string;
  date: string;
  dateNo?: string;
  title: string;
  titleNo: string;
  eyebrow: string;
  eyebrowNo: string;
  description: string;
  descriptionNo: string;
  href?: string;
};

export const timelineItems: TimelineItem[] = [
  { id: "bachelor", date: "BEFORE MSC", dateNo: "FØR MASTER", title: "Informatics / robotics background", titleNo: "Bakgrunn i informatikk / robotikk", eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo", description: "Bachelor-level work in informatics and robotics. Exact degree wording and dates will be added after confirmation.", descriptionNo: "Bachelorarbeid innen informatikk og robotikk. Nøyaktig gradsnavn og datoer legges til etter bekreftelse." },
  { id: "master", date: "CURRENT", dateNo: "NÅ", title: "MSc Robotics and Intelligent Systems", titleNo: "Master i robotikk og intelligente systemer", eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo", description: "Current master's studies in robotics and intelligent systems. Work spans perception, learning, control and physical systems.", descriptionNo: "Pågående masterstudier i robotikk og intelligente systemer. Arbeidet spenner over persepsjon, læring, regulering og fysiske systemer." },
  { id: "reg", date: "2026", title: "Oslo Municipality / REG", titleNo: "Oslo kommune / REG", eyebrow: "Project work", eyebrowNo: "Prosjektarbeid", description: "AI-assisted assessment of waste collection sites using image and spatial data, 3D verification and a review workflow.", descriptionNo: "AI-assistert vurdering av renovasjonsanlegg med bilde- og romlige data, 3D-verifisering og en kontrollflyt.", href: "/projects/waste-site-assessment" }
];
