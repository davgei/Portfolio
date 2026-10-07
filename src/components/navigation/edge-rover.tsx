"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function EdgeRover() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 25, mass: 1.3 });
  const y = useTransform(smooth, [0, 1], [0, 440]);
  const wheel = useTransform(smooth, [0, 1], [0, 2880]);
  const reducedMotion = useReducedMotion();

  return (
    <div className="edge-rover" aria-hidden="true">
      <span className="edge-rover__guide" />
      <motion.div className="edge-rover__vehicle" style={{ y: reducedMotion ? 0 : y }}>
        <span className="edge-rover__beam" />
        <span className="edge-rover__sensor" />
        <span className="edge-rover__shell"><span /></span>
        <motion.span className="edge-rover__wheel edge-rover__wheel--front" style={{ rotate: reducedMotion ? 0 : wheel }} />
        <motion.span className="edge-rover__wheel edge-rover__wheel--rear" style={{ rotate: reducedMotion ? 0 : wheel }} />
      </motion.div>
    </div>
  );
}
