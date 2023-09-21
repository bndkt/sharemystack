import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        sms: colors.rose,
      }),
    },
  },
  plugins: [],
} satisfies Config;
