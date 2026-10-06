"use client";

import { languages, type Language } from "@/i18n/translations";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  const { play } = useSound();

  return (
    <div aria-label={t.common.language} className="flex rounded-full border border-line bg-white/5 p-1">
      {(Object.keys(languages) as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => {
            setLanguage(item);
            play("select");
          }}
          className={cn(
            "min-w-10 rounded-full px-3 py-1 text-sm font-semibold transition",
            language === item ? "bg-amber text-ink" : "text-muted hover:text-mist"
          )}
          aria-pressed={language === item}
        >
          {languages[item]}
        </button>
      ))}
    </div>
  );
}
