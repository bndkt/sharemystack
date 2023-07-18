import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { Separator, Text } from "tamagui";

export function List<T>({
  data,
  renderItem,
  placeholder,
  onRefresh,
  refreshing,
}: {
  data: readonly T[] | null;
  renderItem?: ListRenderItem<T> | null;
  placeholder?: JSX.Element | string;
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  placeholder ??= "No data";
  if (typeof placeholder === "string") {
    placeholder = (
      <Text padding="$3" textAlign="center">
        {placeholder}
      </Text>
    );
  }

  return (
    <FlashList
      ListEmptyComponent={placeholder}
      data={data}
      renderItem={renderItem}
      estimatedItemSize={75}
      ItemSeparatorComponent={() => <Separator />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
        />
      }
    />
  );
}
