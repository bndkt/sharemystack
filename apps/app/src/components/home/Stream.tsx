import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { StreamIcon } from "./StreamIcon";
import { List } from "../list";

import { useObservablePicks } from "@/hooks/useObservablePicks";

export function Stream() {
  const picks = useObservablePicks();
  const router = useRouter();

  return (
    <List
      data={picks}
      renderItem={({ item }) => {
        return (
          <ListItem
            icon={<StreamIcon pick={item} />}
            title={`@${item.stackSlug} added ${item.toolName}`}
            subTitle={`in ${item.categoryName}`}
            onPress={() => router.push(`/(tabs)/(stacks)/@${item.stackSlug}`)}
          />
        );
      }}
    />
  );
}
