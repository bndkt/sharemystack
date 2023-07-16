import { createTamagui, createTokens } from "@tamagui/core";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens as defaultTokens } from "@tamagui/themes";
import { createInterFont } from "@tamagui/font-inter";

const headingFont = createInterFont();
const bodyFont = createInterFont();

export const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    sms: "#f43f5e",
  },
});

const appConfig = createTamagui({
  themes,
  defaultTheme: "dark",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  tokens,
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
