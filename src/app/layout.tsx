import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { CursorField } from "@/components/navigation/cursor-field";
import { getBasePath } from "@/lib/utils";

const publicUrl = "https://davgei.github.io/Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: {
    default: "David Benedict Geier | AI & Robotics",
    template: "%s | David Benedict Geier"
  },
  description: "David Benedict Geier studies robotics and intelligent systems at the University of Oslo. Selected work in applied AI, perception, control and physical systems.",
  alternates: { canonical: `${publicUrl}/` },
  icons: {
    icon: `${getBasePath()}/favicon.svg`
  },
  openGraph: {
    title: "David Benedict Geier | AI & Robotics",
    description: "Selected work in applied AI, perception, control and physical systems.",
    type: "website",
    images: [{ url: `${publicUrl}/images/social-preview.png`, width: 1200, height: 630, alt: "David Benedict Geier robotics portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "David Benedict Geier | AI & Robotics",
    description: "Selected work in applied AI, perception, control and physical systems.",
    images: [`${publicUrl}/images/social-preview.png`]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="noise" />
          <div className="scanline" />
          <FloatingNav />
          <CursorField />
          <main className="relative z-10 pt-24">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
