import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#0E1014",
        "surface-soft": "#151821",
        accent: {
          DEFAULT: "#E5E7EB",
          soft: "#9CA3AF"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;

