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
  {
    id: "school", date: "2020–2023", title: "Science studies", titleNo: "Realfag på videregående",
    eyebrow: "Lillestrøm upper secondary school", eyebrowNo: "Lillestrøm videregående skole",
    description: "Studied science at Lillestrøm upper secondary school. Mathematics and physics became the starting point for a growing interest in programming and physical systems.",
    descriptionNo: "Gikk realfag ved Lillestrøm videregående skole. Matematikk og fysikk ble et utgangspunkt for interessen for programmering og fysiske systemer."
  },
  {
    id: "bachelor-start", date: "2023", title: "Informatics and robotics", titleNo: "Informatikk og robotikk",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Began a bachelor's degree in Informatics: Robotics and Intelligent Systems. Worked across programming, mathematics, electronics and the fundamentals of intelligent machines.",
    descriptionNo: "Begynte på bachelor i informatikk: robotikk og intelligente systemer. Arbeidet med programmering, matematikk, elektronikk og grunnlaget for intelligente maskiner."
  },
  {
    id: "bachelor", date: "2026", title: "Bachelor completed", titleNo: "Bachelor fullført",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Completed the bachelor's degree in Informatics: Robotics and Intelligent Systems and chose to continue into a master's programme in the same field.",
    descriptionNo: "Fullførte bachelor i informatikk: robotikk og intelligente systemer og valgte å fortsette med master i samme fagfelt."
  },
  {
    id: "reg", date: "SUMMER 2026", dateNo: "SOMMER 2026", title: "Oslo Municipality / REG", titleNo: "Oslo kommune / REG",
    eyebrow: "Internship in applied AI", eyebrowNo: "Sommerjobb med anvendt AI",
    description: "Built and evaluated a full-stack ML workflow for waste collection sites: image detection, 3D perception, geospatial analysis and a web interface for human review.",
    descriptionNo: "Utviklet og evaluerte en full-stack ML-løsning for renovasjonsanlegg: bildedeteksjon, 3D-persepsjon, geospatial analyse og et webgrensesnitt for menneskelig kontroll.",
    href: "/projects/waste-site-assessment"
  },
  {
    id: "master", date: "NOW", dateNo: "NÅ", title: "MSc Robotics and Intelligent Systems", titleNo: "Master i robotikk og intelligente systemer",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Studying deep learning for autonomous systems, robot control and rapid prototyping. I am especially interested in how perception and learning become useful behaviour.",
    descriptionNo: "Studerer blant annet dyp læring for autonome systemer, robotstyring og hurtig modellframstilling. Jeg er særlig opptatt av hvordan persepsjon og læring blir til nyttig atferd."
  },
  {
    id: "thesis", date: "FUTURE", dateNo: "FREMTID", title: "Planned UR8 thesis", titleNo: "Planlagt masteroppgave om UR8",
    eyebrow: "Rikshospitalet", eyebrowNo: "Rikshospitalet",
    description: "Planned master's thesis involving a UR8 robot at Rikshospitalet. The research question and scope will be specified when the project is confirmed.",
    descriptionNo: "Planlagt masteroppgave med en UR8-robot ved Rikshospitalet. Problemstilling og omfang blir beskrevet når prosjektet er avklart."
  }
];
