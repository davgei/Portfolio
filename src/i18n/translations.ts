export type Language = "en" | "no";

export const languages: Record<Language, string> = {
  en: "EN",
  no: "NO"
};

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      cv: "CV",
      contact: "Contact"
    },
    common: {
      exploreProjects: "Explore projects",
      about: "About",
      contact: "Contact",
      selectedProjects: "Selected projects",
      technicalAreas: "Technical areas",
      backgroundSignal: "Background signal",
      placeholders: "Placeholder content for later replacement",
      openProject: "Open project",
      filterByArea: "Filter by area",
      all: "All",
      soundOn: "Sound on",
      soundOff: "Sound off",
      language: "Language",
      viewGithub: "View GitHub",
      downloadPdf: "Download CV PDF",
      openPdf: "Open CV PDF"
    },
    hero: {
      name: "Your Name",
      degree: "MSc / Master's in Robotics and Intelligent Systems",
      university: "University of Oslo",
      tagline: "Building intelligent systems where perception, control and software meet physical reality."
    },
    pages: {
      projectsTitle: "Project field",
      projectsIntro: "A flexible index for robotics, AI, vision, control and embedded work.",
      aboutTitle: "Technical profile",
      aboutIntro: "A more personal page for replacing with biography, motivation and photos later.",
      cvTitle: "Web CV",
      cvIntro: "Structured for scanning first, with a PDF as a secondary option."
    },
    contact: {
      title: "Contact vector",
      email: "email@example.com",
      linkedin: "LinkedIn placeholder",
      github: "GitHub placeholder",
      phone: "+47 000 00 000"
    }
  },
  no: {
    nav: {
      home: "Hjem",
      projects: "Prosjekter",
      about: "Om meg",
      cv: "CV",
      contact: "Kontakt"
    },
    common: {
      exploreProjects: "Utforsk prosjekter",
      about: "Om meg",
      contact: "Kontakt",
      selectedProjects: "Utvalgte prosjekter",
      technicalAreas: "Tekniske områder",
      backgroundSignal: "Bakgrunnssignal",
      placeholders: "Plassholderinnhold for senere utfylling",
      openProject: "Åpne prosjekt",
      filterByArea: "Filtrer etter område",
      all: "Alle",
      soundOn: "Lyd på",
      soundOff: "Lyd av",
      language: "Språk",
      viewGithub: "Se GitHub",
      downloadPdf: "Last ned CV-PDF",
      openPdf: "Åpne CV-PDF"
    },
    hero: {
      name: "Ditt Navn",
      degree: "MSc / master i robotikk og intelligente systemer",
      university: "Universitetet i Oslo",
      tagline: "Bygger intelligente systemer der persepsjon, regulering og programvare møter fysisk virkelighet."
    },
    pages: {
      projectsTitle: "Prosjektfelt",
      projectsIntro: "En fleksibel indeks for robotikk, AI, syn, regulering og innebygde systemer.",
      aboutTitle: "Teknisk profil",
      aboutIntro: "En mer personlig side som senere kan fylles med biografi, motivasjon og bilder.",
      cvTitle: "Web-CV",
      cvIntro: "Strukturert for rask skanning først, med PDF som sekundærvalg."
    },
    contact: {
      title: "Kontaktvektor",
      email: "email@example.com",
      linkedin: "LinkedIn-plassholder",
      github: "GitHub-plassholder",
      phone: "+47 000 00 000"
    }
  }
} as const;

export type TranslationKey = typeof translations.en;
