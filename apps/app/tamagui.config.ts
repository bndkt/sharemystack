import { createTamagui } from "@tamagui/core";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createInterFont } from "@tamagui/font-inter";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const appConfig = createTamagui({
  themes,
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
