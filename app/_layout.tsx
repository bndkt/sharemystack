import { Home, Layers, Tag, User, Wrench } from "@tamagui/lucide-icons";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../lib/polyfill";
import config from "../tamagui.config";

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
          <Tabs>
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color }) => <Home color={color} />,
              }}
            />
            <Tabs.Screen
              name="(stacks)"
              options={{
                title: "Stacks",
                headerShown: false,
                tabBarIcon: ({ color }) => <Layers color={color} />,
              }}
            />
            <Tabs.Screen
              name="tools"
              options={{
                title: "Tools",
                headerShown: false,
                tabBarIcon: ({ color }) => <Wrench color={color} />,
              }}
            />
            <Tabs.Screen
              name="categories"
              options={{
                title: "Categories",
                headerShown: false,
                tabBarIcon: ({ color }) => <Tag color={color} />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "My Profile",
                tabBarIcon: ({ color }) => <User color={color} />,
              }}
            />
          </Tabs>
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
