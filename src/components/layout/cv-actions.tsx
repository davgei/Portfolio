"use client";

import { Printer } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function CvActions() {
  const { t } = useLanguage();
  return <button type="button" onClick={() => window.print()} className="print-button"><Printer size={17}/>{t.common.printCv}</button>;
}
