"use client";

import { ArrowUpRight, Github, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function ContactSection() {
  const { t, language } = useLanguage();
  return (
    <section id="contact" className="contact-section section-block">
      <div className="container-wide contact-section__inner">
        <div><p className="section-index">/ 06 · {language === "no" ? "KONTAKT" : "CONTACT"}</p><h2>{t.contact.title}</h2><p>{t.contact.intro}</p></div>
        <div className="contact-methods">
          <a href="mailto:davgei996@gmail.com" className="contact-link"><Mail size={19} /><span><small>{language === "no" ? "E-POST" : "EMAIL"}</small>davgei996@gmail.com</span><ArrowUpRight size={18} /></a>
          <a href="tel:+4748398237" className="contact-link"><Phone size={19} /><span><small>{language === "no" ? "TELEFON" : "PHONE"}</small>+47 483 98 237</span><ArrowUpRight size={18} /></a>
          <a href="https://github.com/davgei" target="_blank" rel="noreferrer" className="contact-link"><Github size={19} /><span><small>GITHUB</small>github.com/davgei</span><ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}
