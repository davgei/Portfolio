"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type SoundName = "select" | "navigate" | "confirm" | "tick" | "toggle";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

function tone(audio: AudioContext, start: number, duration: number, from: number, to: number, volume: number, type: OscillatorType) {
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.008, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function click(audio: AudioContext, start: number, duration: number, volume: number, frequency: number) {
  const buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * duration), audio.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(gain).connect(audio.destination);
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start(start);
  source.stop(start + duration);
}

function emitEffect(audio: AudioContext, name: SoundName) {
  const now = audio.currentTime + 0.006;
  if (name === "select") {
    click(audio, now, 0.042, 0.09, 1900);
    tone(audio, now, 0.075, 520, 340, 0.042, "triangle");
  } else if (name === "navigate") {
    click(audio, now, 0.03, 0.05, 1500);
    tone(audio, now, 0.105, 392, 440, 0.05, "sine");
    tone(audio, now + 0.075, 0.15, 587, 659, 0.047, "sine");
  } else if (name === "confirm") {
    click(audio, now, 0.065, 0.12, 1050);
    tone(audio, now, 0.14, 165, 95, 0.075, "triangle");
    tone(audio, now + 0.045, 0.13, 660, 830, 0.045, "sine");
  } else if (name === "toggle") {
    click(audio, now, 0.03, 0.045, 1600);
    tone(audio, now, 0.1, 430, 550, 0.055, "sine");
    tone(audio, now + 0.08, 0.14, 640, 760, 0.045, "sine");
  } else {
    click(audio, now, 0.022, 0.033, 1250);
    tone(audio, now, 0.045, 245, 190, 0.022, "sine");
  }
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioRef = useRef<AudioContext | null>(null);
  const lastTickRef = useRef(0);

  const emit = useCallback((name: SoundName) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audio = audioRef.current?.state === "closed" ? new AudioContextClass() : audioRef.current ?? new AudioContextClass();
      audioRef.current = audio;
      if (audio.state === "suspended") void audio.resume().catch(() => {});
      emitEffect(audio, name);
    } catch {
      // Sound is optional; an unavailable audio device must not interrupt navigation.
    }
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("portfolio-sound") === "off") {
        enabledRef.current = false;
        setEnabled(false);
      }
    } catch { /* Storage can be disabled without disabling the site. */ }
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try { window.localStorage.setItem("portfolio-sound", next ? "on" : "off"); } catch { /* Keep the current session preference. */ }
    if (next) emit("toggle");
    else if (audioRef.current?.state === "running") void audioRef.current.suspend().catch(() => {});
  }, [emit]);

  const play = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    if (name === "tick") {
      const now = performance.now();
      if (now - lastTickRef.current < 120) return;
      lastTickRef.current = now;
    }
    emit(name);
  }, [emit]);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, play, toggle]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used inside SoundProvider");
  return context;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
