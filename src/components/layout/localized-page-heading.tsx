"use client";

import { useLanguage } from "@/i18n/language-provider";

export function LocalizedPageHeading({ page }: { page: "projects" | "about" | "cv" }) {
  const { t } = useLanguage();
  const copy = {
    projects: { label: "/ projects", title: t.pages.projectsTitle, intro: t.pages.projectsIntro },
    about: { label: "/ about", title: t.pages.aboutTitle, intro: t.pages.aboutIntro },
    cv: { label: "/ cv", title: t.pages.cvTitle, intro: t.pages.cvIntro }
  }[page];

  return (
    <section className="container-readable pb-8 pt-16">
      <p className="font-mono text-xs uppercase text-amber">{copy.label}</p>
      <h1 className="mt-4 text-5xl font-semibold text-mist sm:text-6xl">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{copy.intro}</p>
    </section>
  );
}
