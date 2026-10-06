"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function RobotArm() {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const shoulder = useTransform(springX, [0, 1], [-18, 22]);
  const elbow = useTransform(springY, [0, 1], [24, -28]);
  const wrist = useTransform([springX, springY], ([x, y]) => (x - y) * 24);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width);
      pointerY.set((event.clientY - rect.top) / rect.height);
    };

    element.addEventListener("pointermove", handlePointerMove);
    return () => element.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <div ref={ref} className="relative min-h-[420px] overflow-hidden rounded-lg border border-line bg-graphite/35 shadow-glow">
      <div className="technical-grid absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 520" role="img" aria-label="Interactive robotic arm visualization">
        <defs>
          <linearGradient id="arm" x1="0" x2="1">
            <stop stopColor="#efeee8" />
            <stop offset="1" stopColor="#d8a545" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M96 420 C210 310 278 364 358 242 C438 120 544 162 676 78" fill="none" stroke="#d8a545" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="8 14" />
        <path d="M106 102 H682 M106 212 H682 M106 322 H682 M182 58 V464 M318 58 V464 M454 58 V464 M590 58 V464" stroke="white" strokeOpacity="0.06" />
      </svg>

      <motion.div className="absolute left-[18%] top-[67%] h-3 w-28 origin-left rounded-full bg-mist shadow-glow" style={{ rotate: shoulder }} />
      <motion.div className="absolute left-[33%] top-[54%] h-3 w-40 origin-left rounded-full bg-gradient-to-r from-mist to-amber" style={{ rotate: elbow }} />
      <motion.div className="absolute left-[55%] top-[42%] h-3 w-28 origin-left rounded-full bg-cyan/80" style={{ rotate: wrist }} />
      <div className="absolute left-[17%] top-[65%] size-10 rounded-full border border-amber bg-ink shadow-glow" />
      <div className="absolute left-[32%] top-[52%] size-8 rounded-full border border-mist/50 bg-panel" />
      <div className="absolute left-[54%] top-[40%] size-7 rounded-full border border-cyan/60 bg-panel" />
      <div className="absolute bottom-8 left-8 rounded-full border border-line bg-ink/60 px-4 py-2 font-mono text-xs uppercase text-muted">
        IK target
      </div>
    </div>
  );
}
