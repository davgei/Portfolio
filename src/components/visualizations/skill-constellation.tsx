"use client";

import { RobotArm } from "@/components/visualizations/robot-arm";
import { useLanguage } from "@/i18n/language-provider";

export function SkillConstellation() {
  const { t, language } = useLanguage();

  return (
    <section id="systems" className="container-wide scroll-mt-24 section-block">
      <div className="mb-10">
        <p className="section-index">/ 04 · {language === "no" ? "I PRAKSIS" : "IN PRACTICE"}</p>
        <h2 className="mt-3 text-4xl font-semibold text-mist">{t.common.technicalAreas}</h2>
      </div>
      <RobotArm variant="skills" />
    </section>
  );
}
