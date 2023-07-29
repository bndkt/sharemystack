import { Slot, Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack.Screen name="../" options={{ headerShown: false }} />
      <Slot />
    </>
  );
}
