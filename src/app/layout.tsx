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
    default: "David Geier | Robotics & Intelligent Systems",
    template: "%s | David Geier"
  },
  description: "David Geier studies robotics and intelligent systems at the University of Oslo. Selected work in perception, learning, control and hardware.",
  alternates: { canonical: `${publicUrl}/` },
  icons: {
    icon: `${getBasePath()}/favicon.svg`
  },
  openGraph: {
    title: "David Geier | Robotics & Intelligent Systems",
    description: "Selected work in perception, learning, control and hardware.",
    type: "website",
    images: [{ url: `${publicUrl}/images/social-preview.png`, width: 1200, height: 630, alt: "David Geier robotics portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "David Geier | Robotics & Intelligent Systems",
    description: "Selected work in perception, learning, control and hardware.",
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
