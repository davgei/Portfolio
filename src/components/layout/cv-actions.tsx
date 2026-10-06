"use client";

import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function CvActions({ cvPath }: { cvPath: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={cvPath} className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-mist transition hover:border-amber">
        <ExternalLink size={18} />
        {t.common.openPdf}
      </a>
      <a href={cvPath} download className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-mist transition hover:border-amber">
        <Download size={18} />
        {t.common.downloadPdf}
      </a>
    </div>
  );
}
