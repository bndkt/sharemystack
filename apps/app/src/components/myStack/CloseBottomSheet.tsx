import { X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button } from "tamagui";

export function CloseBottomSheet() {
  const router = useRouter();

  return (
    <Button
      icon={<X size="$1.5" />}
      onPress={() => {
        console.log("close bottom sheet");
        router.push("/(tabs)/(stacks)/stacks/my/tmp");
      }}
      unstyled
    />
  );
}
