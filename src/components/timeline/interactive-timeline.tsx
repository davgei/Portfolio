"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { timelineItems } from "@/data/timeline";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export function InteractiveTimeline() {
  const [active, setActive] = useState(3);
  const activeRef = useRef(active);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 76, damping: 20, mass: 1.45 });
  const y = useSpring(targetY, { stiffness: 76, damping: 20, mass: 1.45 });
  const reducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const { play } = useSound();

  const aimAt = (element: HTMLElement) => {
    const track = trackRef.current?.getBoundingClientRect();
    if (!track) return;
    const rect = element.getBoundingClientRect();
    targetX.set(window.innerWidth <= 640 ? 0 : rect.left + rect.width / 2 - track.left);
    targetY.set(window.innerWidth <= 640 ? rect.top + rect.height / 2 - track.top : 0);
  };

  useEffect(() => {
    const update = () => {
      const button = trackRef.current?.querySelectorAll<HTMLButtonElement>(".timeline-point")[activeRef.current];
      if (button) aimAt(button);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  // Initial and resized positions need DOM measurements; pointer movement is handled independently.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (index: number, element?: HTMLElement) => {
    activeRef.current = index;
    setActive(index);
    if (element) aimAt(element);
  };

  const followPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const buttons = [...track.querySelectorAll<HTMLButtonElement>(".timeline-point")];
    const vertical = window.innerWidth <= 640;
    const coordinate = vertical ? event.clientY : event.clientX;
    const nearest = buttons.reduce((best, button, index) => {
      const box = button.getBoundingClientRect();
      const distance = Math.abs(coordinate - (vertical ? box.top + box.height / 2 : box.left + box.width / 2));
      return distance < best.distance ? { index, distance } : best;
    }, { index: activeRef.current, distance: Infinity }).index;
    if (nearest !== activeRef.current) select(nearest);
    if (vertical) targetY.set(Math.max(0, Math.min(rect.height, event.clientY - rect.top)));
    else targetX.set(Math.max(0, Math.min(rect.width, event.clientX - rect.left)));
  };

  return (
    <section id="timeline" className="timeline-section section-block container-wide" onPointerMove={followPointer} onPointerLeave={() => {
      const button = trackRef.current?.querySelectorAll<HTMLButtonElement>(".timeline-point")[activeRef.current];
      if (button) aimAt(button);
    }}>
      <div className="section-heading"><div><p className="section-index">/ 05 · PATH</p><h2>{language === "no" ? "Erfaring og utdanning" : "Experience path"}</h2></div></div>
      <div className="timeline-machine">
        <div ref={trackRef} className="timeline-track" role="group" aria-label={language === "no" ? "Tidslinje" : "Timeline"}>
          <motion.div className="timeline-carriage" style={{ x, y }} aria-hidden="true"><span className="timeline-carriage__head" /><span className="timeline-carriage__pointer" /></motion.div>
          {timelineItems.map((entry, index) => <button key={entry.id} type="button" aria-pressed={active === index} onClick={(event) => { select(index, event.currentTarget); play("select"); }} onPointerEnter={(event) => { if (event.pointerType === "mouse") select(index, event.currentTarget); }} className={`timeline-point ${active === index ? "is-active" : ""}`}>
            <span className="timeline-dot" /><span className="timeline-date">{language === "no" ? entry.dateNo ?? entry.date : entry.date}</span><strong>{language === "no" ? entry.titleNo : entry.title}</strong>
          </button>)}
        </div>
        <div className="timeline-detail" aria-live="polite">
          {timelineItems.map((entry, index) => <div key={entry.id} className="timeline-detail__panel" style={{ visibility: active === index ? "visible" : "hidden" }} aria-hidden={active !== index}>
            <span className="section-index">0{index + 1} / 0{timelineItems.length} · {language === "no" ? entry.eyebrowNo : entry.eyebrow}</span>
            <h3>{language === "no" ? entry.titleNo : entry.title}</h3>
            <p>{language === "no" ? entry.descriptionNo : entry.description}</p>
            {entry.href && <Link href={entry.href} className="text-link">{language === "no" ? "Se prosjekt" : "View project"}<ArrowUpRight size={17}/></Link>}
          </div>)}
        </div>
      </div>
    </section>
  );
}
