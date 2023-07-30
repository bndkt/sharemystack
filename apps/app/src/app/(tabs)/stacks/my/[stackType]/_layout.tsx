import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Slot, Stack, useLocalSearchParams } from "expo-router";

export default function Layout() {
  const { stackType: stackTypeSlug } = useLocalSearchParams<{
    stackType: string;
  }>();
  const { user } = useAuth();
  const { profile, stack, picks } = useProfile({
    user,
    stackTypeSlug,
  });

  return (
    <>
      <Stack.Screen options={{ title: stack?.stackTypeName }} />
      <Slot />
    </>
  );
}
