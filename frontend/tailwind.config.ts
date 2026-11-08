import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        mitra: {
          indigo: "#17152B",      // Midnight Indigo
          deepViolet: "#29234B",  // Deep Violet
          royal: "#7655E8",       // Royal Violet
          lavender: "#EDE8FF",    // Lavender
          ivory: "#F7F5F0",       // Soft Ivory
          white: "#FFFFFF",       // Pure White
          gold: "#E8C98A",        // Champagne Gold
          slate: "#555366",       // Slate Text
          muted: "#9290A0",       // Muted Grey
          success: "#329B75",     // Success Green
          // Legacy aliases for backward compatibility without breaking old tokens:
          light: {
            bg: "#F7F5F0",
            secondary: "#EDE8FF",
            primary: "#7655E8",
            deep: "#29234B",
            soft: "#EDE8FF",
            card: "#FFFFFF",
            text: "#17152B",
            muted: "#555366",
            border: "#E5E0D8",
          },
          dark: {
            bg: "#12101F",
            secondary: "#1A162B",
            card: "#1A162B",
            primary: "#7655E8",
            deep: "#29234B",
            text: "#F7F5F0",
            muted: "#9290A0",
            border: "#2E274D",
          },
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(23, 21, 43, 0.05), 0 1px 2px rgba(23, 21, 43, 0.03)",
        card: "0 4px 20px -2px rgba(23, 21, 43, 0.05), 0 2px 6px -1px rgba(23, 21, 43, 0.03)",
        hover: "0 12px 30px -4px rgba(118, 85, 232, 0.16), 0 4px 10px -2px rgba(23, 21, 43, 0.04)",
        glow: "0 0 25px -3px rgba(118, 85, 232, 0.25)",
        gold: "0 4px 16px -2px rgba(232, 201, 138, 0.35)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse_slow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
