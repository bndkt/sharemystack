import "expo-dev-client";
import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";
import { TamaguiProvider, Theme } from "@tamagui/core";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef, useState } from "react";
import { AppState, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@/lib/sentry";
import "@/lib/vexo";
// import "@/lib/onesignal";
import { config } from "@/lib/config";
import { database } from "@/lib/watermelon";
import { AuthProvider } from "@/providers/AuthProvider";
import { NavigationThemeProvider } from "@/providers/NavigationThemeProvider";
import { SyncProvider } from "@/providers/SyncProvider";
import tamaguiConfig from "@/tamagui.config";

export default function Layout() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const colorScheme = useColorScheme();
  const [activeColorScheme, setActiveColorScheme] = useState(colorScheme);

  useEffect(() => {
    if (appStateVisible === "active") {
      setActiveColorScheme(colorScheme);
    }
  }, [appStateVisible, colorScheme]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PostHogProvider
      apiKey={config.postHogApiKey}
      options={{
        host: "https://app.posthog.com",
        // enable: false,
      }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={activeColorScheme}>
          <NavigationThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <DatabaseProvider database={database}>
                  <AuthProvider>
                    <SyncProvider>
                      <Stack>
                        <Stack.Screen
                          name="(tabs)"
                          options={{
                            title: "Home",
                            headerShown: false,
                          }}
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
            </GestureHandlerRootView>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
      <StatusBar style="auto" />
    </PostHogProvider>
  );
}
