"use client";

import { RobotArm } from "@/components/visualizations/robot-arm";
import { useLanguage } from "@/i18n/language-provider";

export function SkillConstellation() {
  const { t } = useLanguage();

  return (
    <section id="technical-areas" className="container-wide scroll-mt-24 py-20">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase text-amber">/ 03</p>
        <h2 className="mt-3 text-4xl font-semibold text-mist">{t.common.technicalAreas}</h2>
      </div>
      <RobotArm variant="skills" />
    </section>
  );
}
