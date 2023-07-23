import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="stacks"
        options={{ title: "Stacks", headerShown: false }}
      />
      <Stack.Screen name="[stack]" options={{ title: "Stack" }} />
    </Stack>
  );
}
