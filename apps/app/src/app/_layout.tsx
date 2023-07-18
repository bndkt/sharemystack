import "expo-dev-client";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Suspense } from "react";
// import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import "@/lib/polyfill";
// import "@/lib/watermelon";
import "@/lib/sentry";
import "@/lib/vexo";
import "@/lib/mixpanel";
import "@/lib/onesignal";
import { Loading } from "@/components/Loading";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NavigationThemeProvider } from "@/components/providers/NavigationThemeProvider";
import config from "@/tamagui.config";

export default function Layout() {
  // const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <TamaguiProvider config={config}>
        <Theme name={"light"}>
          <NavigationThemeProvider>
            <SafeAreaProvider>
              <AuthProvider>
                <Slot />
              </AuthProvider>
            </SafeAreaProvider>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
    </Suspense>
  );
}
