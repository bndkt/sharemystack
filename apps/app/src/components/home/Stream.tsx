import { ListItem } from "tamagui";

import { StreamIcon } from "./StreamIcon";
import { List } from "../List";

import { useObservablePicks } from "@/hooks/useObservablePicks";

export function Stream() {
  const picks = useObservablePicks();

  return (
    <List
      data={picks}
      renderItem={({ item }) => {
        return (
          <ListItem
            icon={<StreamIcon pick={item} />}
            title={`@${item.stackSlug} added ${item.toolName}`}
            subTitle={`in ${item.categoryName}`}
          />
        );
      }}
    />
  );
}
