import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-secondary": "var(--bg-secondary)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          secondary: "var(--accent-secondary)",
          soft: "var(--accent-soft)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        border: "var(--border)",
        divider: "var(--divider)",
        // spotlight (dark sections)
        spot: {
          bg: "var(--spot-bg)",
          surface: "var(--spot-surface)",
          text: "var(--spot-text)",
          muted: "var(--spot-text-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        sub: ["var(--font-sub)", "var(--font-body)", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "10px",
        DEFAULT: "14px",
        md: "16px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(17,17,17,0.04)",
        sm: "0 2px 8px rgba(17,17,17,0.05)",
        md: "0 8px 24px rgba(17,17,17,0.06)",
        lg: "0 16px 48px rgba(17,17,17,0.08)",
        accent: "0 12px 32px rgba(37,99,235,0.14)",
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 1.6s infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
