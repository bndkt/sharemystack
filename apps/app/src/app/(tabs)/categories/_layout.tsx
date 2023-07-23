import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Categories", headerShown: false }}
      />
      <Stack.Screen name="[category]" options={{ title: "Category" }} />
    </Stack>
  );
}
