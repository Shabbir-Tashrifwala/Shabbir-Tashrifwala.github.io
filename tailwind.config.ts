import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#FAF7F2",
          "bg-secondary": "#F0EBE3",
          "bg-tertiary": "#E8E2D9",
          "text-primary": "#1A1A1A",
          "text-secondary": "#4A4A4A",
          "text-tertiary": "#8A8578",
          accent: "#C8553D",
          "accent-hover": "#A94432",
          border: "#E0DAD0",
          "border-light": "#EDE8E0",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
