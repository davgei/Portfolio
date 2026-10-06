"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { timelineItems } from "@/data/timeline";
import { useLanguage } from "@/i18n/language-provider";

export function InteractiveTimeline() {
  const [active, setActive] = useState(timelineItems[1].id);
  const { language } = useLanguage();
  const item = timelineItems.find((entry) => entry.id === active) ?? timelineItems[1];
  return (
    <section className="timeline-section section-block container-wide">
      <div className="section-heading"><div><p className="section-index">/ 03 · PATH</p><h2>{language === "no" ? "Erfaring og utdanning" : "Experience path"}</h2></div></div>
      <div className="timeline-track" role="group" aria-label={language === "no" ? "Tidslinje" : "Timeline"} onPointerMove={(event) => {
        if (event.buttons !== 1 || window.innerWidth < 640) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const index = Math.min(timelineItems.length - 1, Math.max(0, Math.floor((event.clientX - rect.left) / rect.width * timelineItems.length)));
        setActive(timelineItems[index].id);
      }}>
        {timelineItems.map((entry) => <button key={entry.id} type="button" aria-pressed={active === entry.id} onClick={() => setActive(entry.id)} onPointerEnter={(event) => { if (event.pointerType === "mouse" && event.buttons === 0) setActive(entry.id); }} className={active === entry.id ? "timeline-point is-active" : "timeline-point"}><span className="timeline-dot"/><span className="timeline-date">{language === "no" ? entry.dateNo ?? entry.date : entry.date}</span><strong>{language === "no" ? entry.titleNo : entry.title}</strong></button>)}
      </div>
      <div className="timeline-detail" aria-live="polite"><span className="section-index">{language === "no" ? item.eyebrowNo : item.eyebrow}</span><h3>{language === "no" ? item.titleNo : item.title}</h3><p>{language === "no" ? item.descriptionNo : item.description}</p>{item.href && <Link href={item.href} className="text-link">{language === "no" ? "Se prosjekt" : "View project"}<ArrowUpRight size={17}/></Link>}</div>
    </section>
  );
}
