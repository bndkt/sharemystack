import "expo-dev-client";
import "react-native-gesture-handler";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { LogBox, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import "@/lib/polyfill";
import "@/lib/sentry";
import "@/lib/vexo";
import "@/lib/mixpanel";
import "@/lib/onesignal";
import { database } from "@/lib/watermelon";
import { AuthProvider } from "@/providers/AuthProvider";
import { NavigationThemeProvider } from "@/providers/NavigationThemeProvider";
import { SyncProvider } from "@/providers/SyncProvider";
import config from "@/tamagui.config";

// TODO: Temporarily remove warnings
LogBox.ignoreLogs([
  "@supabase/gotrue-js: Stack guards not supported",
  "The `redirect` prop",
]);

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={"light"}>
        <NavigationThemeProvider>
          <SafeAreaProvider>
            <DatabaseProvider database={database}>
              <SyncProvider>
                <AuthProvider>
                  <Slot />
                </AuthProvider>
              </SyncProvider>
            </DatabaseProvider>
          </SafeAreaProvider>
        </NavigationThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
