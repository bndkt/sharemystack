import { X } from "@tamagui/lucide-icons";
import { Stack, useRouter } from "expo-router";
import { Button } from "tamagui";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Button
            icon={<X size="$1.5" />}
            onPress={() => {
              router.back();
            }}
            unstyled
            color="$gray10"
          />
        ),
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Share" }} />
      <Stack.Screen name="[stack]" options={{ title: "Share" }} />
    </Stack>
  );
}
