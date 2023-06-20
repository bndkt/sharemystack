import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Button, Text, YStack } from "tamagui";

import { CategoryList } from "../categories/CategoryList";
import {
  CategoriesResponse,
  getCategories,
} from "../../lib/database/getCategories";

export function StackSheet() {
  const [show, setShow] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, [getCategories, setCategories]);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setShow(true);
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
      {show && (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <YStack fullscreen paddingHorizontal="$3">
            <Text>Add tools to stack</Text>
            <CategoryList categories={categories} />
          </YStack>
        </BottomSheetModal>
      )}
    </BottomSheetModalProvider>
  );
}
