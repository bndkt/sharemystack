import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Share my profile" }} />
      <Stack.Screen name="[stack]" options={{ title: "Share my stack" }} />
    </Stack>
  );
}
