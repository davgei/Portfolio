"use client";

import Link from "next/link";
import { ArrowLeft, Contact, FileText, FolderKanban, Home, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { LanguageSwitch } from "./language-switch";
import { SoundToggle } from "./sound-toggle";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home", icon: Home },
  { href: "/projects", key: "projects", icon: FolderKanban },
  { href: "/about", key: "about", icon: UserRound },
  { href: "/cv", key: "cv", icon: FileText },
  { href: "/#contact", key: "contact", icon: Contact }
] as const;

export function FloatingNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { play } = useSound();

  return (
    <header className="site-nav fixed inset-x-0 top-4 z-50 px-4">
      {pathname !== "/" && <Link href="/" className="site-back"><ArrowLeft size={17} />{t.nav.home}</Link>}
      <nav
        aria-label={t.common.language === "Språk" ? "Hovednavigasjon" : "Primary navigation"}
        className="mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-line bg-ink/90 p-2 shadow-glow backdrop-blur-xl"
      >
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? pathname === "/" : item.key === "contact" ? false : pathname.startsWith(item.href);
            const label = t.nav[item.key];

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => play("navigate")}
                className={cn(
                  "group relative grid size-10 place-items-center rounded-full text-muted transition hover:text-amber",
                  active && "bg-white/10 text-mist"
                )}
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
                <span className="pointer-events-none absolute top-12 scale-95 rounded-full border border-line bg-panel px-3 py-1 text-xs text-mist opacity-0 shadow-hairline transition group-hover:scale-100 group-hover:opacity-100">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const label = t.nav[item.key];
            const active = item.href === "/" ? pathname === "/" : item.key === "contact" ? false : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={cn("grid size-9 place-items-center rounded-full text-muted", active && "bg-white/10 text-mist")} aria-label={label} title={label}>
                <Icon size={17} />
              </Link>
            );
          })}
        </div>

      </nav>
      <div className="nav-settings flex items-center gap-2"><LanguageSwitch /><SoundToggle /></div>
    </header>
  );
}
