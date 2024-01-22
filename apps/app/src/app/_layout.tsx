import "expo-dev-client";
import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";
import { TamaguiProvider } from "@tamagui/core";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "@/lib/vexo";
import { config } from "@/lib/config";
import { database } from "@/lib/watermelon";
import { AuthProvider } from "@/providers/AuthProvider";
import { SyncProvider } from "@/providers/SyncProvider";
import tamaguiConfig from "@/tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  return (
    <PostHogProvider
      apiKey={config.postHogApiKey}
      options={{
        host: "https://app.posthog.com",
      }}
    >
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={colorScheme === "dark" ? "dark" : "light"}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
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
        </ThemeProvider>
      </TamaguiProvider>
    </PostHogProvider>
  );
}
