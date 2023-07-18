import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ReactNode } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { Separator, Text, getTokens } from "tamagui";

export type GenerateRightActions<T> = (item: T) => {
  text: ReactNode;
  color: string;
  onPress: () => void;
}[];

export function List<T>({
  data,
  renderItem,
  placeholder,
  onRefresh,
  refreshing,
}: {
  data: readonly T[] | null;
  renderItem?: ListRenderItem<T> | null;
  placeholder?: JSX.Element;
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  const tokens = getTokens({ prefixed: false });

  placeholder ??= (
    <Text padding="$3" textAlign="center">
      No data
    </Text>
  );

  return (
    <FlashList
      ListEmptyComponent={placeholder}
      ItemSeparatorComponent={() => <Separator />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
          tintColor={tokens.color.sms.toString()}
        />
      }
      renderItem={renderItem}
      estimatedItemSize={75}
      data={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}
