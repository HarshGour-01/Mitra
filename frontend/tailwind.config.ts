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
          light: {
            bg: "#FFF8FA",
            secondary: "#FFF0F5",
            primary: "#E879A5",
            deep: "#C94F7C",
            soft: "#F8DCE8",
            card: "#FFFFFF",
            text: "#30232A",
            muted: "#806D76",
            border: "#F1DCE5",
          },
          dark: {
            bg: "#171217",
            secondary: "#211922",
            card: "#2B202A",
            primary: "#F09ABB",
            deep: "#D77A9E",
            text: "#FFF3F7",
            muted: "#C3ADB8",
            border: "#493440",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(232, 121, 165, 0.08)",
        card: "0 4px 20px -2px rgba(201, 79, 124, 0.06)",
        hover: "0 10px 25px -5px rgba(232, 121, 165, 0.15)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse_slow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
