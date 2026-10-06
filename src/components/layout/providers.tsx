"use client";

import { LanguageProvider } from "@/i18n/language-provider";
import { SoundProvider } from "@/hooks/use-sound";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoundProvider>{children}</SoundProvider>
    </LanguageProvider>
  );
}
