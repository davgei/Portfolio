import type { Metadata } from "next";
import { AboutContent } from "@/components/layout/about-content";

export const metadata: Metadata = { title: "About", description: "About David Geier, robotics and intelligent systems student at the University of Oslo." };

export default function AboutPage() { return <AboutContent />; }
