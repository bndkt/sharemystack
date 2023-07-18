import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Check, Plus } from "@tamagui/lucide-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, YStack, useTheme } from "tamagui";

import {
  CategoriesResponse,
  getCategories,
} from "../../lib/database/getCategories";
import { ToolsResponse, getTools } from "../../lib/database/getTools";
import { supabase } from "../../lib/supabase";
import { List } from "../List";
import { Loading } from "../Loading";
import { CategoryList } from "../categories/CategoryList";
import { ToolIcon } from "../icons/ToolIcon";

export function StackSheet({
  stack,
  refresh: refreshStack,
}: {
  stack: string | null;
  refresh: () => void;
}) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);
  const [tool, setTool] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, [getCategories, setCategories]);

  useEffect(() => {
    if (category) {
      setLoading(true);
      getTools({ category }).then(({ data }) => {
        setTools(data);
        setLoading(false);
        setRefresh(false);
      });
    }
  }, [category, getTools, setTools, refresh]);

  useEffect(() => {
    if (stack && category && tool) {
      setLoading(true);
      const query = supabase
        .from("picks")
        .insert({ stack_id: stack, tool_id: tool, category_id: category });

      query.then((result) => {
        // console.log({ result });
        setRefresh(true);
        refreshStack();
        setTool(null);
        // setCategory(null);
        setLoading(false);
      });
    }
  }, [stack, category, tool]);

  function removePick(stackId: string, categoryId: string, toolId: string) {
    console.log("Remove tool", { stackId, categoryId, toolId });
    const query = supabase
      .from("picks")
      .delete()
      .match({ stack_id: stackId, tool_id: toolId });
    query.then((result) => {
      setRefresh(true);
      refreshStack();
    });
  }

  const snapPoints = useMemo(() => [/* "25%", */ "50%" /* "75%" */], []);

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
        {isLoading ? (
          <Loading />
        ) : category ? (
          <YStack fullscreen>
            <YStack paddingHorizontal="$3">
              <Button onPress={() => setCategory(null)}>
                Back to categories
              </Button>
            </YStack>
            <List
              data={tools}
              onPress={(item) =>
                stack && item.user_picks && item.id
                  ? removePick(stack, category, item.id)
                  : setTool(item.id)
              }
              title={(item) => item.name}
              subTitle={(item) => item.website}
              icon={(item) => (
                <ToolIcon svgXml={item.icon} width="24" height="24" />
              )}
              iconAfter={(item) =>
                item.user_picks ? (
                  <Check color="gray" size="$1" />
                ) : (
                  <Plus size="$1" />
                )
              }
            />
          </YStack>
        ) : (
          <YStack fullscreen>
            <YStack paddingHorizontal="$3">
              <Button onPress={() => bottomSheetModalRef.current?.close()}>
                Close
              </Button>
            </YStack>
            <CategoryList
              categories={categories}
              onPress={(category: string | null) => {
                setCategory(category);
              }}
            />
          </YStack>
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
