import "expo-dev-client";
import "react-native-gesture-handler";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { TamaguiProvider, Theme } from "@tamagui/core";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { LogBox, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        host: "https://app.posthog.com",
      }}
    >
      <TamaguiProvider config={config}>
        <Theme name={colorScheme}>
          <NavigationThemeProvider>
            <SafeAreaProvider>
              <DatabaseProvider database={database}>
                <AuthProvider>
                  <SyncProvider>
                    <Stack>
                      <Stack.Screen
                        name="(tabs)"
                        options={{ title: "Home", headerShown: false }}
                      />
                      <Stack.Screen
                        name="[profile]"
                        options={{ headerShown: true }}
                      />
                    </Stack>
                  </SyncProvider>
                </AuthProvider>
              </DatabaseProvider>
            </SafeAreaProvider>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
      <StatusBar style="auto" />
    </PostHogProvider>
  );
}
