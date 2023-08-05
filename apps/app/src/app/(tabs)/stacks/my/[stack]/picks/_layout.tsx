import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "@tamagui/core";
import { X } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { Button } from "tamagui";

export default function Layout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const router = useRouter();
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();

  const snapPoints = useMemo(() => ["50%"], []); // "25%", "50%", "75%"

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      onClose={() => router.push(`/(tabs)/stacks/my/${stackId}/_tmp`)} // TODO: Workaround
      style={{
        shadowColor: theme.color.val,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: theme.background.val,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.color.val,
      }}
      handleStyle={{
        backgroundColor: theme.background.val,
      }}
      backgroundStyle={{ backgroundColor: theme.background.val }}
    >
      <Stack
        screenOptions={{
          headerRight: () => (
            <Button
              icon={<X size="$1.5" />}
              onPress={() => {
                router.push(`/(tabs)/stacks/my/${stackId}/_tmp`); // TODO: Workaround
              }}
              unstyled
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Categories" }} />
        <Stack.Screen name="[category]" options={{ title: "Tools" }} />
      </Stack>
    </BottomSheet>
  );
}
