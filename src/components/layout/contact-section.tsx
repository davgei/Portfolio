"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="contact-section section-block">
      <div className="container-wide contact-section__inner"><div><p className="section-index">/ CONTACT</p><h2>{t.contact.title}</h2><p>{t.contact.intro}</p></div><a href="https://github.com/davgei" target="_blank" rel="noreferrer" className="contact-link"><Github size={24} /><span>{t.contact.github}</span><ArrowUpRight size={23} /></a></div>
    </section>
  );
}
