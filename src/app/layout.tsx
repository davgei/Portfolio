import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { CursorField } from "@/components/navigation/cursor-field";
import { getBasePath } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://davgei.github.io"),
  title: {
    default: "Robotics Portfolio",
    template: "%s | Robotics Portfolio"
  },
  description: "Interactive technical portfolio foundation for robotics, AI, computer vision and autonomous systems.",
  icons: {
    icon: `${getBasePath()}/favicon.svg`
  },
  openGraph: {
    title: "Robotics Portfolio",
    description: "Interactive technical portfolio foundation for robotics, AI and autonomous systems.",
    type: "website",
    images: [`${getBasePath()}/images/social-preview-placeholder.svg`]
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics Portfolio",
    description: "Interactive technical portfolio foundation for robotics, AI and autonomous systems.",
    images: [`${getBasePath()}/images/social-preview-placeholder.svg`]
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
