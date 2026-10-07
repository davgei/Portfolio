"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/language-provider";

const sections = [
  { id: "top", en: "Start", no: "Start" },
  { id: "about-preview", en: "About", no: "Om meg" },
  { id: "projects", en: "Work", no: "Prosjekter" },
  { id: "systems", en: "Practice", no: "Fagfelt" },
  { id: "timeline", en: "Path", no: "Erfaring" },
  { id: "contact", en: "Contact", no: "Kontakt" },
];

export function SectionRail() {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const position = useMotionValue(100 / (sections.length * 2));
  const smoothPosition = useSpring(position, { stiffness: 82, damping: 24, mass: 1.2 });
  const top = useTransform(smoothPosition, (value) => `${value}%`);
  const [active, setActive] = useState(0);
  const [instantPosition, setInstantPosition] = useState(100 / (sections.length * 2));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.scrollY + window.innerHeight * 0.43;
      const offsets = sections.map(({ id }) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
      });
      let index = 0;
      while (index < offsets.length - 1 && anchor >= offsets[index + 1]) index++;
      const next = offsets[index + 1];
      const span = next === undefined ? window.innerHeight : Math.max(1, next - offsets[index]);
      const fraction = next === undefined ? 0 : Math.max(0, Math.min(1, (anchor - offsets[index]) / span));
      const value = ((index + 0.5 + fraction) / sections.length) * 100;
      position.set(value);
      setInstantPosition(value);
      setActive(index);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [position]);

  return (
    <nav className="section-rail" aria-label={language === "no" ? "Seksjoner" : "Sections"}>
      <span className="section-rail__thread" aria-hidden="true" />
      <span className="section-rail__track" aria-hidden="true" />
      {sections.map((section, index) => (
        <a key={section.id} href={`#${section.id}`} className={`section-rail__stop${active === index ? " is-active" : ""}`} aria-current={active === index ? "location" : undefined}>
          <span className="section-rail__number">{String(index + 1).padStart(2, "0")}</span>
          <span className="section-rail__label">{language === "no" ? section.no : section.en}</span>
        </a>
      ))}
      <motion.span className="section-rail__gantry" style={{ top: reducedMotion ? `${instantPosition}%` : top }} aria-hidden="true">
        <span className="section-rail__gantry-body"><i /><i /></span>
        <span className="section-rail__gantry-hotend" />
        <span className="section-rail__gantry-nozzle" />
      </motion.span>
    </nav>
  );
}
