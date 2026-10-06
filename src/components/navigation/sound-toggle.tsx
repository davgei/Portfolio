"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();
  const { t } = useLanguage();
  const label = enabled ? t.common.soundOn : t.common.soundOff;

  return (
    <button
      type="button"
      onClick={() => {
        toggle();
        play("confirm");
      }}
      className="grid size-10 place-items-center rounded-full border border-line bg-white/5 text-mist transition hover:border-amber hover:text-amber"
      aria-label={label}
      title={label}
    >
      {enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </button>
  );
}
