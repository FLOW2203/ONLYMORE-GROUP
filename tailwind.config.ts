import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0D7377",
          dark: "#0A5C5F",
          light: "#10918A",
        },
        gold: {
          DEFAULT: "#C5975B",
          dark: "#A67D48",
          light: "#D4AB74",
        },
        deep: {
          black: "#0A0A0A",
        },
        warm: {
          white: "#F8F6F3",
        },
        neutral: {
          gray: "#6B7280",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
