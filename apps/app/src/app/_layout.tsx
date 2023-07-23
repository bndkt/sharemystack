import "expo-dev-client";
import "react-native-gesture-handler";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Suspense, useEffect } from "react";
// import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import "@/lib/polyfill";
import "@/lib/sentry";
import "@/lib/vexo";
import "@/lib/mixpanel";
import "@/lib/onesignal";
import { Loading } from "@/components/Loading";
import { useSync } from "@/hooks/useSync";
import { database } from "@/lib/watermelon";
import { AuthProvider } from "@/providers/AuthProvider";
import { NavigationThemeProvider } from "@/providers/NavigationThemeProvider";
import config from "@/tamagui.config";

export default function Layout() {
  // const colorScheme = useColorScheme();
  const { refresh } = useSync();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    const subscription = database
      .withChangesForTables([
        "tools",
        "categories",
        "categorizations",
        "stacks",
        "picks",
        "stars",
      ])
      .subscribe((changes) => {
        refresh();
      });

    return () => subscription.unsubscribe();
  }, [database]);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <TamaguiProvider config={config}>
        <Theme name={"light"}>
          <NavigationThemeProvider>
            <SafeAreaProvider>
              <DatabaseProvider database={database}>
                <AuthProvider>
                  <Slot />
                </AuthProvider>
              </DatabaseProvider>
            </SafeAreaProvider>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
    </Suspense>
  );
}
