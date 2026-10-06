"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { timelineItems } from "@/data/timeline";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export function InteractiveTimeline() {
  const [active, setActive] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 100, damping: 19, mass: 1.35 });
  const y = useSpring(targetY, { stiffness: 100, damping: 19, mass: 1.35 });
  const reducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const { play } = useSound();
  const item = timelineItems[active];

  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const button = track?.querySelectorAll<HTMLButtonElement>(".timeline-point")[active];
      if (button) aimAt(button);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  // The selected stop is intentionally the carriage's resting position.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const aimAt = (element: HTMLElement) => {
    const track = trackRef.current?.getBoundingClientRect();
    if (!track) return;
    const rect = element.getBoundingClientRect();
    targetX.set(window.innerWidth <= 640 ? 0 : rect.left + rect.width / 2 - track.left);
    targetY.set(window.innerWidth <= 640 ? rect.top + rect.height / 2 - track.top : 0);
  };

  return (
    <section id="timeline" className="timeline-section section-block container-wide">
      <div className="section-heading"><div><p className="section-index">/ 05 · PATH</p><h2>{language === "no" ? "Erfaring og utdanning" : "Experience path"}</h2></div></div>
      <div className="timeline-machine">
        <div ref={trackRef} className="timeline-track" role="group" aria-label={language === "no" ? "Tidslinje" : "Timeline"} onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || reducedMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (window.innerWidth > 640) targetX.set(Math.max(0, Math.min(rect.width, event.clientX - rect.left)));
          if (window.innerWidth <= 640) targetY.set(Math.max(0, Math.min(rect.height, event.clientY - rect.top)));
        }}>
          <motion.div className="timeline-carriage" style={{ x, y }} aria-hidden="true"><span className="timeline-carriage__head" /><span className="timeline-carriage__pointer" /></motion.div>
          {timelineItems.map((entry, index) => <button key={entry.id} type="button" aria-pressed={active === index} onClick={(event) => { setActive(index); aimAt(event.currentTarget); play("select"); }} onPointerEnter={(event) => { if (event.pointerType === "mouse") { setActive(index); aimAt(event.currentTarget); } }} className={`timeline-point ${active === index ? "is-active" : ""}`}>
            <span className="timeline-dot" /><span className="timeline-date">{entry.date}</span><strong>{language === "no" ? entry.titleNo : entry.title}</strong>
          </button>)}
        </div>
        <div className="timeline-detail" aria-live="polite"><span className="section-index">0{active + 1} / 0{timelineItems.length} · {language === "no" ? item.eyebrowNo : item.eyebrow}</span><h3>{language === "no" ? item.titleNo : item.title}</h3><p>{language === "no" ? item.descriptionNo : item.description}</p>{item.href && <Link href={item.href} className="text-link">{language === "no" ? "Se prosjekt" : "View project"}<ArrowUpRight size={17}/></Link>}</div>
      </div>
    </section>
  );
}
