"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { useSound } from "@/hooks/use-sound";
import { getBasePath } from "@/lib/utils";

export function AboutPreview() {
  const { language } = useLanguage();
  const { play } = useSound();
  const no = language === "no";
  return (
    <section id="about-preview" className="about-preview section-block">
      <div className="container-wide about-preview__inner">
        <div className="about-preview__photo">
          <Image src={`${getBasePath()}/images/about/david-geier.jpeg`} alt={no ? "Portrett av David Geier" : "Portrait of David Geier"} fill sizes="(max-width: 640px) 90vw, 360px" priority />
          <span>DAVID BENEDICT GEIER / 2026</span>
        </div>
        <div className="about-preview__copy">
          <p className="section-index">/ 02 · {no ? "OM MEG" : "ABOUT"}</p>
          <h2>{no ? "Det jeg liker å bygge, og hvorfor." : "What I like to build, and why."}</h2>
          <p>{no ? "Jeg studerer robotikk og intelligente systemer ved Universitetet i Oslo. Jeg liker å jobbe i skjæringspunktet mellom programvare, mekanikk og menneskene som faktisk skal bruke teknologien." : "I study robotics and intelligent systems at the University of Oslo. I like working where software, mechanics and the people who use technology meet."}</p>
          <p>{no ? "Utenfor studiene spiller jeg ishockey og i band, skrur på veteranbil og motorsykkel, og lager ting med 3D-printer, Arduino og Raspberry Pi." : "Outside university I play ice hockey and in a band, work on a classic car and motorcycle, and build things with 3D printers, Arduino and Raspberry Pi."}</p>
          <Link href="/about" onClick={() => play("navigate")} className="about-preview__link">{no ? "Bli bedre kjent" : "Get to know me"}<ArrowUpRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
