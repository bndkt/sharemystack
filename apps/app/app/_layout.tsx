import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import "@/lib/polyfill";
import "@/lib/sentry";
import "@/lib/vexo";
import "@/lib/mixpanel";
import "@/lib/onesignal";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NavigationThemeProvider } from "@/components/providers/NavigationThemeProvider";
import config from "@/tamagui.config";

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <TamaguiProvider config={config}>
        <Theme>
          <NavigationThemeProvider>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
    </AuthProvider>
  );
}
