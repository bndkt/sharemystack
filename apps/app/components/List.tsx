import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, Separator, Text } from "tamagui";

export function List<T>({
  data,
  href,
  title,
  subTitle,
}: {
  data: readonly T[];
  href: (item: T) => string;
  title: (item: T) => string;
  subTitle?: (item: T) => string | null | undefined;
}) {
  return data && data.length ? (
    <FlashList
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => {
        return (
          <Link href={href(item)}>
            <ListItem
              title={title(item)}
              subTitle={subTitle && subTitle(item)}
              iconAfter={ChevronRight}
            />
          </Link>
        );
      }}
      estimatedItemSize={data.length}
      data={data}
    />
  ) : (
    <Text>No data</Text>
  );
}
