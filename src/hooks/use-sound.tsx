"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type SoundName = "select" | "navigate" | "confirm";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const tones: Record<SoundName, { frequency: number; duration: number; gain: number }> = {
  select: { frequency: 740, duration: 0.11, gain: 0.075 },
  navigate: { frequency: 440, duration: 0.14, gain: 0.07 },
  confirm: { frequency: 920, duration: 0.18, gain: 0.085 }
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);

  const emit = useCallback((name: SoundName) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audio = audioRef.current ?? new AudioContextClass();
    audioRef.current = audio;
    if (audio.state === "suspended") void audio.resume();
    const tone = tones[name];
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(tone.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(tone.frequency * 0.72, now + tone.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(tone.gain, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(now);
    oscillator.stop(now + tone.duration);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-sound");
    if (stored === "on") { enabledRef.current = true; setEnabled(true); }
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    window.localStorage.setItem("portfolio-sound", next ? "on" : "off");
    if (next) emit("confirm");
    else if (audioRef.current?.state === "running") void audioRef.current.suspend();
  }, [emit]);

  const play = useCallback(
    (name: SoundName) => {
      if (enabled) emit(name);
    },
    [enabled, emit]
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, play, toggle]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used inside SoundProvider");
  }

  return context;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
