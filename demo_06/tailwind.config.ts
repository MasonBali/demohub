import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      // sm: "640px",
      // md: "768px",
      // lg: "960px",
      // xl: "1200px",
      sm: "512px", // Adjusted for 125% zoom
      md: "614px", // Adjusted for 125% zoom
      lg: "768px", // Adjusted for 125% zoom
      xl: "960px", // Adjusted for 125% zoom
    },
    fontFamily: {
      primary: "var(--font-geist-sans)",
      secondary: "var(--font-geist-mono)",
    },
    extend: {
      colors: {
        primary: "#1c1c22",
        secondary: "#27272c",
        tertiary: "#232329",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e187",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
