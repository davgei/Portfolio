export type Language = "en" | "no";

export const languages: Record<Language, string> = { en: "EN", no: "NO" };

export const translations = {
  en: {
    nav: { home: "Home", projects: "Work", about: "About", cv: "CV", contact: "Contact" },
    common: {
      exploreProjects: "Explore work", about: "About", contact: "Contact", selectedProjects: "Selected work",
      technicalAreas: "Technical system map", backgroundSignal: "Outside the lab", openProject: "View project",
      filterByArea: "Filter by area", all: "All", soundOn: "Sound on", soundOff: "Sound off", language: "Language",
      viewGithub: "View GitHub", printCv: "Print / save PDF", nextProject: "Next project", overview: "All projects",
      projectContext: "The problem", projectContribution: "My contribution", projectApproach: "System approach",
      projectOutcome: "Current result", projectNext: "What comes next", conceptual: "Conceptual system diagram"
    },
    hero: {
      name: "David Geier", degree: "MSc Informatics: Robotics and Intelligent Systems", university: "University of Oslo",
      tagline: "I build systems that connect perception, learning and control with the physical world.",
      status: "OSLO · ROBOTICS / AI · 2026", sequence: "PERCEPTION  →  LEARNING  →  CONTROL  →  HARDWARE"
    },
    pages: {
      projectsTitle: "Selected work", projectsIntro: "Robotics, intelligent systems and practical engineering across software and hardware.",
      aboutTitle: "About David", aboutIntro: "I study robotics and intelligent systems at the University of Oslo, with a particular interest in the point where AI meets physical systems.",
      cvTitle: "Curriculum vitae", cvIntro: "A concise view of education, experience and selected technical work."
    },
    contact: { title: "Let's connect", intro: "Project notes and code are on GitHub. Professional contact details can be added here after confirmation.", github: "GitHub / davgei" },
    about: {
      statement: "I like engineering problems that end outside the screen.",
      body: "My work moves between sensing, machine learning, robot control and mechanical design. I am interested in how complete systems behave, from the first data point to the final physical action.",
      methodTitle: "How I work", method: "Start with the real constraint. Prototype a complete path through the system. Measure, inspect and iterate where the behavior breaks down.",
      interestTitle: "Current interests", interest: "Autonomous systems, 3D perception, reinforcement learning, control and mechatronics.",
      outsideTitle: "Outside the lab", outside: "CAD assemblies, physical prototyping and sensor rigs keep my software work grounded in real constraints."
    },
    cv: { education: "Education", experience: "Experience", projects: "Selected projects", skills: "Technical areas", languages: "Languages", verify: "Exact degree wording and dates to be confirmed." }
  },
  no: {
    nav: { home: "Hjem", projects: "Arbeid", about: "Om", cv: "CV", contact: "Kontakt" },
    common: {
      exploreProjects: "Utforsk arbeid", about: "Om", contact: "Kontakt", selectedProjects: "Utvalgt arbeid",
      technicalAreas: "Teknisk systemkart", backgroundSignal: "Utenfor laben", openProject: "Se prosjekt",
      filterByArea: "Filtrer etter område", all: "Alle", soundOn: "Lyd på", soundOff: "Lyd av", language: "Språk",
      viewGithub: "Se GitHub", printCv: "Skriv ut / lagre PDF", nextProject: "Neste prosjekt", overview: "Alle prosjekter",
      projectContext: "Utfordringen", projectContribution: "Mitt bidrag", projectApproach: "Systemtilnærming",
      projectOutcome: "Nåværende resultat", projectNext: "Neste steg", conceptual: "Konseptuelt systemdiagram"
    },
    hero: {
      name: "David Geier", degree: "Master i informatikk: robotikk og intelligente systemer", university: "Universitetet i Oslo",
      tagline: "Jeg bygger systemer som kobler persepsjon, læring og regulering til den fysiske verden.",
      status: "OSLO · ROBOTIKK / AI · 2026", sequence: "PERSEPSJON  →  LÆRING  →  REGULERING  →  MASKINVARE"
    },
    pages: {
      projectsTitle: "Utvalgt arbeid", projectsIntro: "Robotikk, intelligente systemer og praktisk ingeniørarbeid på tvers av programvare og maskinvare.",
      aboutTitle: "Om David", aboutIntro: "Jeg studerer robotikk og intelligente systemer ved Universitetet i Oslo, med særlig interesse for møtet mellom AI og fysiske systemer.",
      cvTitle: "Curriculum vitae", cvIntro: "En kort oversikt over utdanning, erfaring og utvalgt teknisk arbeid."
    },
    contact: { title: "Ta kontakt", intro: "Prosjektnotater og kode finnes på GitHub. Profesjonell kontaktinformasjon kan legges til her etter bekreftelse.", github: "GitHub / davgei" },
    about: {
      statement: "Jeg liker tekniske problemer som ender utenfor skjermen.",
      body: "Arbeidet mitt beveger seg mellom sensorer, maskinlæring, robotregulering og mekanisk design. Jeg er interessert i hvordan hele systemer fungerer, fra første datapunkt til siste fysiske handling.",
      methodTitle: "Hvordan jeg arbeider", method: "Start med den virkelige begrensningen. Bygg en prototype gjennom hele systemet. Mål, undersøk og iterer der atferden ikke stemmer.",
      interestTitle: "Faglige interesser", interest: "Autonome systemer, 3D-persepsjon, forsterkningslæring, regulering og mekatronikk.",
      outsideTitle: "Utenfor laben", outside: "CAD-sammenstillinger, fysisk prototyping og sensorrigger holder programvarearbeidet mitt forankret i reelle begrensninger."
    },
    cv: { education: "Utdanning", experience: "Erfaring", projects: "Utvalgte prosjekter", skills: "Tekniske områder", languages: "Språk", verify: "Eksakt gradsnavn og datoer må bekreftes." }
  }
} as const;

export type TranslationKey = typeof translations.en;
