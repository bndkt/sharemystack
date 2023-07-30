import { X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button } from "tamagui";

export function CloseBottomSheet({
  stackTypeSlug,
}: {
  stackTypeSlug?: string;
}) {
  const router = useRouter();

  return (
    <Button
      icon={<X size="$1.5" />}
      onPress={() => {
        router.push(`/(tabs)/stacks/my/${stackTypeSlug}/_tmp`);
      }}
      unstyled
    />
  );
}
