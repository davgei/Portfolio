export type TimelineItem = {
  id: string;
  date: string;
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
    id: "bachelor-start", date: "2023", title: "Informatics and robotics", titleNo: "Informatikk og robotikk",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Started a bachelor's degree in Informatics: Robotics and Intelligent Systems. Built a foundation in programming, mathematics and physical systems.",
    descriptionNo: "Begynte på bachelor i informatikk: robotikk og intelligente systemer. Bygget grunnlag i programmering, matematikk og fysiske systemer."
  },
  {
    id: "bachelor", date: "2026", title: "Bachelor completed", titleNo: "Bachelor fullført",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Completed the bachelor's degree and continued towards a master's in the same field.",
    descriptionNo: "Fullførte bachelorgraden og fortsatte mot master i samme fagfelt."
  },
  {
    id: "reg", date: "SUMMER 2026", title: "Oslo Municipality / REG", titleNo: "Oslo kommune / REG",
    eyebrow: "Internship", eyebrowNo: "Sommerjobb",
    description: "Built and evaluated a full-stack ML workflow spanning image detection, 3D perception, geospatial analysis and a web interface for human review.",
    descriptionNo: "Utviklet og evaluerte en full-stack ML-løsning med bildedeteksjon, 3D-persepsjon, geospatial analyse og et webgrensesnitt for menneskelig kontroll.",
    href: "/projects/waste-site-assessment"
  },
  {
    id: "master", date: "NOW", title: "MSc Robotics and Intelligent Systems", titleNo: "Master i robotikk og intelligente systemer",
    eyebrow: "University of Oslo", eyebrowNo: "Universitetet i Oslo",
    description: "Now studying robotic systems, deep learning and control, with a particular interest in how perception becomes useful action.",
    descriptionNo: "Studerer nå robotsystemer, dyp læring og styring, særlig hvordan persepsjon kan omsettes til nyttig handling."
  }
];
