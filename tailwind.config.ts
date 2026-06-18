import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#060b0d",
          panel: "#11181b",
          panelSoft: "#162125",
          mint: "#7bd4b4",
          amber: "#d8a94b"
        }
      },
      boxShadow: {
        studio: "0 24px 72px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
