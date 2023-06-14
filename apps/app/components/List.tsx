import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { FunctionComponent } from "react";
import { ListItem, Separator, Text } from "tamagui";

export function List<T>({
  data,
  href,
  title,
  subTitle,
  icon,
  placeholder,
}: {
  data: readonly T[] | null;
  href: (item: T) => string;
  title: (item: T) => string | null;
  subTitle?: (item: T) => string | null | undefined;
  icon?: (
    item: T
  ) =>
    | JSX.Element
    | FunctionComponent<{ color?: string; size?: number }>
    | null;
  placeholder?: JSX.Element;
}) {
  placeholder ??= <Text>No data</Text>;

  return data && data.length ? (
    <FlashList
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => {
        return (
          <Link href={href(item)}>
            <ListItem
              title={title(item)}
              subTitle={subTitle && subTitle(item)}
              icon={icon && icon(item)}
              iconAfter={ChevronRight}
            />
          </Link>
        );
      }}
      estimatedItemSize={data.length}
      data={data}
    />
  ) : (
    placeholder
  );
}
