"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { timelineItems } from "@/data/timeline";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";

export function InteractiveTimeline() {
  const [active, setActive] = useState(timelineItems[0].id);
  const { play } = useSound();

  return (
    <section className="container-wide py-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase text-amber">/ timeline</p>
          <h2 className="mt-3 text-4xl font-semibold text-mist">Trajectory</h2>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex gap-3 overflow-x-auto rounded-lg border border-line bg-white/[0.03] p-3 lg:flex-col">
          {timelineItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActive(item.id);
                play("select");
              }}
              className={cn(
                "min-w-72 rounded-lg border p-4 text-left transition lg:min-w-0",
                active === item.id ? "border-amber bg-amber/10" : "border-line bg-panel/45 hover:border-mist/30"
              )}
            >
              <span className="font-mono text-xs uppercase text-muted">{item.date}</span>
              <span className="mt-3 block text-lg font-semibold text-mist">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{item.eyebrow}</span>
            </button>
          ))}
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-lg border border-line bg-graphite/35 p-6">
          <div className="technical-grid absolute inset-0 opacity-70" />
          {timelineItems.map((item) => (
            active === item.id && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10"
              >
                <p className="font-mono text-xs uppercase text-amber">{item.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-semibold text-mist">{item.title}</h3>
                <p className="mt-4 max-w-2xl leading-7 text-muted">{item.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line bg-ink/70 px-3 py-1 text-sm text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
