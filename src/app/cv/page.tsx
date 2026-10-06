import type { Metadata } from "next";
import { CvContent } from "@/components/layout/cv-content";

export const metadata: Metadata = { title: "CV", description: "Education, engineering experience and selected projects of David Geier." };

export default function CvPage() { return <CvContent />; }
