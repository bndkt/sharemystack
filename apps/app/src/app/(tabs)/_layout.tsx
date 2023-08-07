import {
  Home,
  Layers,
  Settings,
  Tag,
  User,
  UserCircle,
  Wrench,
} from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
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
        name="my"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <UserCircle color={color} />,
        }}
      />
      <Tabs.Screen
        name="stacks"
        options={{
          title: "Stacks",
          headerShown: false,
          tabBarIcon: ({ color }) => <Layers color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Tools",
          headerShown: false,
          tabBarIcon: ({ color }) => <Wrench color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
