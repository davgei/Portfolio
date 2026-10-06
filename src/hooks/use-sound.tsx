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
  select: { frequency: 740, duration: 0.045, gain: 0.018 },
  navigate: { frequency: 440, duration: 0.065, gain: 0.022 },
  confirm: { frequency: 920, duration: 0.055, gain: 0.02 }
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-sound");
    if (stored === "on") setEnabled(true);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      window.localStorage.setItem("portfolio-sound", next ? "on" : "off");
      return next;
    });
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audio = audioRef.current ?? new AudioContextClass();
      audioRef.current = audio;

      const tone = tones[name];
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = tone.frequency;
      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(tone.gain, audio.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + tone.duration);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + tone.duration);
    },
    [enabled]
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
