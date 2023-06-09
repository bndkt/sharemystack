import { Home, Layers, Tag, User, Wrench } from "@tamagui/lucide-icons";
import { useFonts } from "expo-font";
import { Slot, Stack, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import "../lib/polyfill";
import config from "../tamagui.config";
import { NavigationThemeProvider } from "../components/providers/NavigationThemeProvider";
import { AuthProvider } from "../components/providers/AuthProvider";

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
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <NavigationThemeProvider>
            <AuthProvider>
              <Stack
                screenOptions={{ headerShown: false }}
                initialRouteName="(tabs)"
              >
                <Stack.Screen
                  name="(modals)"
                  options={{ presentation: "modal" }}
                />
              </Stack>
            </AuthProvider>
          </NavigationThemeProvider>
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
