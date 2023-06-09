import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sharemystack: "#f43f5e",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
