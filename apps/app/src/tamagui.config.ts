import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const appConfig = createTamagui({
  // settings: { fastSchemeChange: true },
  themes,
  defaultTheme: "dark",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  tokens: {
    ...tokens,
    color: {
      ...tokens.color,
      sms: "#f43f5e",
    },
  },
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
