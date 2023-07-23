import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Tools", headerShown: false }}
      />
      <Stack.Screen name="[tool]" options={{ title: "Tool" }} />
    </Stack>
  );
}
