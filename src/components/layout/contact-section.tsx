"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

const contactItems = [
  { key: "email", icon: Mail, href: "mailto:email@example.com" },
  { key: "linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/placeholder" },
  { key: "github", icon: Github, href: "https://github.com/username" },
  { key: "phone", icon: Phone, href: "tel:+4700000000" }
] as const;

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="container-wide py-20">
      <div className="overflow-hidden rounded-lg border border-line bg-graphite/45 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase text-amber">/ contact</p>
            <h2 className="mt-3 text-4xl font-semibold text-mist">{t.contact.title}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-ink/55 p-4 transition hover:border-amber"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-line text-amber">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm text-mist">{t.contact[item.key]}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
