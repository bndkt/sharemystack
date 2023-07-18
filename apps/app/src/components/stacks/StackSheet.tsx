import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { Button, YStack, useTheme } from "tamagui";

export function StackSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();

  const snapPoints = useMemo(() => ["50%"], []); // "25%", "50%", "75%"

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <YStack padding="$3">
        <Button onPress={handlePresentModalPress}>Add tools to my stack</Button>
      </YStack>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
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
        <Stack>
          <Stack.Screen name="index" options={{ title: "Categories" }} />
          <Stack.Screen name="tools" options={{ title: "Tools" }} />
        </Stack>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
