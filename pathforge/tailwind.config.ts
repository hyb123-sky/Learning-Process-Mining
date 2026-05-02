import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        pf: {
          ivory: "hsl(var(--pf-ivory))",
          "ivory-warm": "hsl(var(--pf-ivory-warm))",
          parchment: "hsl(var(--pf-parchment))",
          gold: "hsl(var(--pf-gold))",
          "gold-light": "hsl(var(--pf-gold-light))",
          "gold-muted": "hsl(var(--pf-gold-muted))",
          navy: "hsl(var(--pf-navy))",
          "navy-mid": "hsl(var(--pf-navy-mid))",
          "navy-light": "hsl(var(--pf-navy-light))",
          success: "hsl(var(--pf-success))",
          warning: "hsl(var(--pf-warning))",
          error: "hsl(var(--pf-error))",
          info: "hsl(var(--pf-info))",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "crest-reveal": {
          "0%":   { opacity: "0", transform: "scale(0.3) rotate(-15deg)" },
          "50%":  { opacity: "1", transform: "scale(1.15) rotate(3deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(239 84% 67% / 0.3)" },
          "50%":      { boxShadow: "0 0 16px 6px hsl(239 84% 67% / 0.12)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "crest-reveal": "crest-reveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "gold-pulse":   "gold-pulse 2s ease-in-out infinite",
        "fade-in":      "fade-in 200ms cubic-bezier(0, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
