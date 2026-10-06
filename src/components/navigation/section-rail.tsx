"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/language-provider";

const sections = [
  { id: "top", en: "Start", no: "Start" },
  { id: "about-preview", en: "About", no: "Om meg" },
  { id: "projects", en: "Work", no: "Prosjekter" },
  { id: "systems", en: "Systems", no: "Systemer" },
  { id: "timeline", en: "Path", no: "Tidslinje" },
  { id: "contact", en: "Contact", no: "Kontakt" }
];

export function SectionRail() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const yTarget = useMotionValue(8.33);
  const y = useSpring(yTarget, { stiffness: 115, damping: 20, mass: 1.1 });
  const yPercent = useTransform(y, (value) => `${value}%`);

  useEffect(() => { yTarget.set(8.33 + active * 16.667); }, [active, yTarget]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const threshold = window.innerHeight * 0.43;
      let current = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = index;
      });
      setActive(current);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(raf); };
  }, []);

  return (
    <nav className="section-rail" aria-label={language === "no" ? "Seksjoner på siden" : "Page sections"}>
      <div className="section-rail__track" aria-hidden="true" />
      <motion.div className="section-rail__gantry" style={reducedMotion ? { top: `${8.33 + active * 16.667}%` } : { top: yPercent }} aria-hidden="true">
        <span className="section-rail__gantry-body"><i /><i /></span><span className="section-rail__gantry-tip" />
      </motion.div>
      {sections.map((section, index) => (
        <a key={section.id} href={`#${section.id}`} aria-label={language === "no" ? section.no : section.en} title={language === "no" ? section.no : section.en} aria-current={active === index ? "location" : undefined} className={`section-rail__stop ${active === index ? "is-active" : ""}`}>
          <span className="section-rail__number">0{index + 1}</span><span className="section-rail__label">{language === "no" ? section.no : section.en}</span>
        </a>
      ))}
    </nav>
  );
}
