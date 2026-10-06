"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Bone2D, Chain2D, V2 } from "ikts";
import { skillClusters } from "@/data/skills";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

type Point = { x: number; y: number };
type ArmPose = {
  width: number;
  height: number;
  joints: [Point, Point, Point, Point];
  target: Point;
  extension: number;
  maxExtension: number;
  thirdBase: number;
};
type Press = Point & { id: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const skillPositions = [
  "md:left-[5%] md:top-[16%]",
  "md:right-[5%] md:top-[16%]",
  "md:right-[5%] md:top-[48%]",
  "md:bottom-[8%] md:left-[43%]"
];

export function RobotArm({ variant = "hero" }: { variant?: "hero" | "skills" }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<(point: Point, press?: boolean) => void>(() => {});
  const [pose, setPose] = useState<ArmPose | null>(null);
  const [press, setPress] = useState<Press | null>(null);
  const [selected, setSelected] = useState(1);
  const { language } = useLanguage();
  const { play } = useSound();
  const playRef = useRef(play);
  const isSkills = variant === "skills";
  const activeSkill = skillClusters[selected];

  useEffect(() => { playRef.current = play; }, [play]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let chain: Chain2D | null = null;
    let frameId = 0;
    let pulseTimeout = 0;
    let pressId = 0;
    let lockedUntil = 0;
    let extension = 0;
    let current: Point = { x: 0, y: 0 };
    let desired: Point = { x: 0, y: 0 };
    let geometry = { width: 0, height: 0, first: 0, second: 0, third: 0, maxExtension: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      frameId = 0;
      if (!chain) return;
      const activeChain = chain;
      const ease = reducedMotion ? 1 : 0.14;
      current = {
        x: current.x + (desired.x - current.x) * ease,
        y: current.y + (desired.y - current.y) * ease
      };
      const base = activeChain.getBaseLocation();
      const distance = Math.hypot(current.x - base.x, current.y - base.y);
      const needed = clamp(distance - geometry.first - geometry.second - geometry.third + 22, 0, geometry.maxExtension);
      extension += (needed - extension) * ease;

      activeChain.bones[2].setLength(geometry.third + extension);
      activeChain.updateChainLength();
      activeChain.resetTarget();
      activeChain.solveForTarget(new V2(current.x, current.y));
      const joints = [
        { x: activeChain.bones[0].start.x, y: activeChain.bones[0].start.y },
        { x: activeChain.bones[0].end.x, y: activeChain.bones[0].end.y },
        { x: activeChain.bones[1].end.x, y: activeChain.bones[1].end.y },
        { x: activeChain.bones[2].end.x, y: activeChain.bones[2].end.y }
      ] as [Point, Point, Point, Point];
      setPose({
        width: geometry.width,
        height: geometry.height,
        joints,
        target: { ...current },
        extension,
        maxExtension: geometry.maxExtension,
        thirdBase: geometry.third
      });

      if (Math.hypot(desired.x - current.x, desired.y - current.y) > 0.4 || Math.abs(needed - extension) > 0.4) {
        frameId = requestAnimationFrame(draw);
      }
    };
    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(draw);
    };
    const aim = (point: Point, mark = false) => {
      if (!chain) return;
      desired = {
        x: clamp(point.x, 16, geometry.width - 16),
        y: clamp(point.y, 16, geometry.height - 16)
      };
      if (mark) {
        lockedUntil = performance.now() + 850;
        setPress({ ...desired, id: ++pressId });
        window.clearTimeout(pulseTimeout);
        pulseTimeout = window.setTimeout(() => setPress(null), 750);
      }
      schedule();
    };
    aimRef.current = aim;

    const pointFromPointer = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!reducedMotion && event.pointerType !== "touch" && performance.now() >= lockedUntil) aim(pointFromPointer(event));
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button === 0) { aim(pointFromPointer(event), true); if (!isSkills) playRef.current("confirm"); }
    };
    const observer = new ResizeObserver(() => {
      const { width, height } = stage.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      const compact = width < 680;
      const scale = isSkills ? (compact ? Math.max(width, height * 0.63) : Math.max(width, height)) : Math.max(height, width * 0.72);
      const base = new V2(width * (compact && isSkills ? 0.18 : isSkills ? 0.13 : compact ? 0.18 : 0.64), height * (isSkills ? 0.83 : compact ? 0.78 : 0.12));
      geometry = {
        width, height,
        first: scale * 0.32,
        second: scale * 0.27,
        third: scale * 0.12,
        maxExtension: compact && isSkills ? height * 0.33 : scale * (isSkills ? 0.2 : 0.29)
      };
      chain = new Chain2D();
      chain.addBone(new Bone2D(base, undefined, new V2(0.6, -0.8), geometry.first));
      chain.addConsecutiveBone(new V2(0.8, -0.6), geometry.second, 180, 180);
      chain.addConsecutiveBone(new V2(1, 0), geometry.third, 180, 180);
      chain.setMaxIterationAttempts(20);
      desired = compact && isSkills
        ? { x: width * 0.72, y: height * 0.48 }
        : { x: width * (isSkills ? 0.64 : 0.8), y: height * (isSkills ? 0.31 : 0.62) };
      current = { ...desired };
      extension = 0;
      schedule();
    });
    observer.observe(stage);
    const pointerSurface = isSkills ? stage : stage.closest<HTMLElement>(".hero") ?? stage;
    pointerSurface.addEventListener("pointermove", onPointerMove);
    pointerSurface.addEventListener("pointerdown", onPointerDown);

    return () => {
      observer.disconnect();
      pointerSurface.removeEventListener("pointermove", onPointerMove);
      pointerSurface.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(frameId);
      window.clearTimeout(pulseTimeout);
      aimRef.current = () => {};
    };
  }, [isSkills]);

  const aimAtButton = (button: HTMLElement, mark = true) => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    aimRef.current({
      x: buttonRect.left + buttonRect.width / 2 - stageRect.left,
      y: buttonRect.top + buttonRect.height / 2 - stageRect.top
    }, mark);
  };
  const moveWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !pose) return;
    const steps: Record<string, Point> = {
      ArrowLeft: { x: -28, y: 0 }, ArrowRight: { x: 28, y: 0 },
      ArrowUp: { x: 0, y: -28 }, ArrowDown: { x: 0, y: 28 }
    };
    const step = steps[event.key];
    if (step) {
      event.preventDefault();
      aimRef.current({ x: pose.target.x + step.x, y: pose.target.y + step.y });
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      aimRef.current(pose.target, true);
    }
  };

  const tip = pose?.joints[3];
  const sleeve = pose && {
    x: pose.joints[2].x + (pose.joints[3].x - pose.joints[2].x) * (pose.thirdBase * 0.88 / (pose.thirdBase + pose.extension)),
    y: pose.joints[2].y + (pose.joints[3].y - pose.joints[2].y) * (pose.thirdBase * 0.88 / (pose.thirdBase + pose.extension))
  };
  const tipAngle = pose ? Math.atan2(pose.joints[3].y - pose.joints[2].y, pose.joints[3].x - pose.joints[2].x) * 180 / Math.PI : 0;
  const tipGap = pose ? Math.hypot(pose.target.x - pose.joints[3].x, pose.target.y - pose.joints[3].y) : 0;

  return (
    <div className={isSkills ? "border border-line bg-panel/45" : "relative h-full"}>
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={moveWithKeyboard}
        aria-label={language === "no" ? "Robotarm. Bruk piltastene for å flytte målet, Enter for å trykke." : "Robot arm. Use arrow keys to move the target and Enter to press."}
        className={`relative isolate overflow-hidden outline-none focus-visible:outline-amber ${isSkills ? "h-[680px] bg-graphite/35 md:h-[610px]" : "h-full min-h-[420px] bg-transparent"}`}
      >
        <div className="technical-grid pointer-events-none absolute inset-0" />
        {pose && (
          <svg className={`pointer-events-none absolute inset-0 h-full w-full ${isSkills ? "z-20" : ""}`} viewBox={`0 0 ${pose.width} ${pose.height}`} aria-hidden="true">
            <path d={`M 0 ${pose.joints[0].y + 28} H ${pose.width}`} stroke="#8adce7" strokeOpacity="0.13" strokeDasharray="5 12" />
            <circle cx={pose.joints[0].x} cy={pose.joints[0].y} r={Math.min(pose.width, pose.height) * 0.46} fill="none" stroke="#d8a545" strokeOpacity="0.09" strokeDasharray="4 12" />
            {pose.joints.slice(0, 2).map((point, index) => {
              const next = pose.joints[index + 1];
              return (
                <g key={index}>
                  <line x1={point.x} y1={point.y} x2={next.x} y2={next.y} stroke="#08090a" strokeWidth="40" strokeLinecap="round" />
                  <line x1={point.x} y1={point.y} x2={next.x} y2={next.y} stroke={index === 0 ? "#aab0af" : "#d7d9d5"} strokeWidth="27" strokeLinecap="round" />
                  <line x1={point.x} y1={point.y} x2={next.x} y2={next.y} stroke="#f6f6ec" strokeOpacity="0.38" strokeWidth="4" strokeLinecap="round" />
                </g>
              );
            })}
            <line x1={pose.joints[2].x} y1={pose.joints[2].y} x2={tip?.x} y2={tip?.y} stroke="#d8a545" strokeWidth="13" strokeLinecap="round" />
            <line x1={pose.joints[2].x} y1={pose.joints[2].y} x2={sleeve?.x} y2={sleeve?.y} stroke="#08090a" strokeWidth="35" strokeLinecap="round" />
            <line x1={pose.joints[2].x} y1={pose.joints[2].y} x2={sleeve?.x} y2={sleeve?.y} stroke="#6d797b" strokeWidth="25" strokeLinecap="round" />
            <line x1={pose.joints[2].x} y1={pose.joints[2].y} x2={sleeve?.x} y2={sleeve?.y} stroke="#eff1ed" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
            <path d={`M ${pose.joints[0].x - 50} ${pose.joints[0].y + 36} h 100 l 17 13 h -134 z`} fill="#111415" stroke="#606764" strokeWidth="2" />
            {pose.joints.slice(0, 3).map((point, index) => (
              <g key={index}>
                <circle cx={point.x} cy={point.y} r={index === 0 ? 28 : 25} fill="#0a0c0d" stroke={index === 2 ? "#d8a545" : "#7c8787"} strokeWidth="3" />
                <circle cx={point.x} cy={point.y} r="15" fill="#424b4b" stroke="#d4d8d4" strokeWidth="2" />
                <circle cx={point.x} cy={point.y} r="5" fill="#d8a545" />
              </g>
            ))}
          </svg>
        )}
        {isSkills && (
          <div className="absolute inset-x-3 top-20 z-10 grid grid-cols-2 gap-2 sm:inset-x-6 sm:gap-3 md:inset-0 md:block md:pointer-events-none">
            {skillClusters.map((cluster, index) => (
              <button
                key={cluster.title}
                type="button"
                aria-pressed={selected === index}
                onClick={(event) => { setSelected(index); aimAtButton(event.currentTarget); play("select"); }}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") aimAtButton(event.currentTarget, false); }}
                className={`relative min-h-[112px] cursor-pointer border text-left backdrop-blur-md transition-colors md:pointer-events-auto md:absolute md:min-h-[96px] md:w-[23%] ${skillPositions[index]} ${selected === index ? "border-amber bg-ink/95 text-mist" : "border-line bg-ink/85 text-muted hover:border-mist/60 hover:bg-ink/95"}`}
              >
                <span className="absolute left-3 top-3 font-mono text-[11px] text-amber sm:left-4 sm:top-4">0{index + 1}</span>
                <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-5 text-mist sm:bottom-4 sm:left-4 sm:right-4 sm:text-base">{language === "no" ? cluster.titleNo : cluster.title}</span>
              </button>
            ))}
          </div>
        )}
        {pose && (
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox={`0 0 ${pose.width} ${pose.height}`} aria-hidden="true">
            {tipGap > 18 && <line x1={tip?.x} y1={tip?.y} x2={pose.target.x} y2={pose.target.y} stroke="#d8a545" strokeOpacity="0.45" strokeDasharray="3 7" />}
            <circle cx={pose.target.x} cy={pose.target.y} r="17" fill="none" stroke="#d8a545" strokeOpacity="0.6" strokeDasharray="3 5" />
            <circle cx={pose.target.x} cy={pose.target.y} r="3" fill="#d8a545" />
            <path d={`M ${pose.target.x - 26} ${pose.target.y} h 10 M ${pose.target.x + 16} ${pose.target.y} h 10 M ${pose.target.x} ${pose.target.y - 26} v 10 M ${pose.target.x} ${pose.target.y + 16} v 10`} stroke="#d8a545" strokeOpacity="0.6" />
            {press && <circle key={press.id} className="arm-target-pulse" cx={press.x} cy={press.y} r="13" fill="none" stroke="#d8a545" strokeWidth="2" />}
            <g transform={`translate(${tip?.x} ${tip?.y}) rotate(${tipAngle})`}>
              <rect x="-17" y="-10" width="21" height="20" rx="3" fill="#111415" stroke="#d8a545" strokeWidth="2" />
              <path d="M 4 -10 L 20 -15 L 27 -7 M 4 10 L 20 15 L 27 7" fill="none" stroke="#e8e9e3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        )}
        <div className="arm-telemetry pointer-events-none absolute bottom-4 left-4 z-30 flex gap-4 font-mono text-[11px] uppercase text-muted sm:bottom-6 sm:left-6">
          <span>{language === "no" ? "Uttrekk" : "Extension"} {pose ? Math.round(pose.extension / pose.maxExtension * 100) : 0}%</span>
          <span className="text-amber">IK / 03</span>
        </div>
      </div>
      {isSkills && (
        <div className="grid gap-4 border-t border-line bg-ink/85 p-5 sm:p-7 md:grid-cols-[220px_1fr] md:gap-8" aria-live="polite">
          <div>
            <p className="font-mono text-xs text-amber">0{selected + 1} / 04</p>
            <h3 className="mt-2 text-xl font-semibold text-mist">{language === "no" ? activeSkill.titleNo : activeSkill.title}</h3>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-6 text-muted">{language === "no" ? activeSkill.descriptionNo : activeSkill.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeSkill.skills.map((skill) => <span key={skill} className="border border-line px-2 py-1 font-mono text-xs text-mist">{skill}</span>)}
            </div>
            <Link href={`/projects/${activeSkill.projectSlug}`} className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-amber hover:text-mist">{activeSkill.projectLabel} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      )}
    </div>
  );
}
