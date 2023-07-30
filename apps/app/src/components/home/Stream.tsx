import { Layers } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { StreamIcon } from "./StreamIcon";
import { List } from "../list";

import { useObservablePicks } from "@/hooks/useObservablePicks";

export function Stream() {
  const picks = useObservablePicks().filter(
    (pick) => pick.toolName && pick.stackName && pick.stackSlug
  );
  const router = useRouter();

  return (
    <List
      data={picks}
      renderItem={({ item }) => {
        return (
          <ListItem
            icon={<StreamIcon pick={item} />}
            title={`${item.stackName} (@${item.stackSlug})`}
            subTitle={`added ${item.toolName} in ${item.categoryName}`}
            onPress={() => router.push(`/(tabs)/stacks/@${item.stackSlug}`)}
            iconAfter={<Layers size="$1.5" />}
          />
        );
      }}
    />
  );
}
