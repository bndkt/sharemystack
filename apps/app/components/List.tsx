import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { FunctionComponent } from "react";
import { GestureResponderEvent } from "react-native";
import { ListItem, Separator, Text } from "tamagui";

export function List<T>({
  data,
  href,
  title,
  subTitle,
  icon,
  onPress,
  placeholder,
}: {
  data: readonly T[] | null;
  href?: (item: T) => string;
  title: (item: T) => string | null;
  subTitle?: (item: T) => string | null | undefined;
  icon?: (
    item: T
  ) =>
    | JSX.Element
    | FunctionComponent<{ color?: string; size?: number }>
    | null;
  onPress?: (item: T) => void;
  placeholder?: JSX.Element;
}) {
  placeholder ??= <Text>No data</Text>;

  return data && data.length ? (
    <FlashList
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => {
        return href ? (
          <Link href={href(item)}>
            <ListItem
              title={title(item)}
              subTitle={subTitle && subTitle(item)}
              icon={icon && icon(item)}
              iconAfter={ChevronRight}
            />
          </Link>
        ) : onPress ? (
          <ListItem
            title={title(item)}
            subTitle={subTitle && subTitle(item)}
            icon={icon && icon(item)}
            onPress={onPress ? () => onPress(item) : undefined}
            iconAfter={ChevronRight}
          />
        ) : (
          <ListItem
            title={title(item)}
            subTitle={subTitle && subTitle(item)}
            icon={icon && icon(item)}
          />
        );
      }}
      estimatedItemSize={data.length}
      data={data}
    />
  ) : (
    placeholder
  );
}
