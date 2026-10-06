import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050506",
        panel: "#101011",
        graphite: "#18181a",
        line: "rgba(255,255,255,0.12)",
        mist: "#efeee8",
        muted: "#a8a59c",
        amber: "#d8a545",
        copper: "#c66d3d",
        cyan: "#8adce7"
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(216, 165, 69, 0.18)",
        hairline: "inset 0 0 0 1px rgba(255,255,255,0.1)"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: [typography]
};

export default config;
