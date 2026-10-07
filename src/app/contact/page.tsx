import type { Metadata } from "next";
import { ContactSection } from "@/components/layout/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact David Benedict Geier about AI, robotics and engineering projects."
};

export default function ContactPage() {
  return <div className="contact-page"><ContactSection /></div>;
}
