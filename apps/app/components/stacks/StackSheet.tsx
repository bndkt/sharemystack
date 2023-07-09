import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Button, YStack } from "tamagui";
import { Check, Plus } from "@tamagui/lucide-icons";

import { CategoryList } from "../categories/CategoryList";
import {
  CategoriesResponse,
  getCategories,
} from "../../lib/database/getCategories";
import { ToolsResponse, getTools } from "../../lib/database/getTools";
import { supabase } from "../../lib/supabase";
import { List } from "../List";
import { ToolIcon } from "../icons/ToolIcon";
import { Loading } from "../Loading";

export function StackSheet({
  stack,
  refresh,
}: {
  stack: string | null;
  refresh: () => void;
}) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);
  const [tool, setTool] = useState<string | null>(null);

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
      });
    }
  }, [category, getTools, setTools]);

  useEffect(() => {
    if (stack && category && tool) {
      setLoading(true);
      const query = supabase
        .from("picks")
        .insert({ stack_id: stack, tool_id: tool, category_id: category });

      query.then((result) => {
        // console.log({ result });
        refresh();
        setTool(null);
        setCategory(null);
        setLoading(false);
      });
    }
  }, [stack, category, tool]);

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
                !item.user_picks ? setTool(item.id) : undefined
              }
              title={(item) => item.name}
              subTitle={(item) => item.website}
              icon={(item) => (
                <ToolIcon svgXml={item.icon} width="24" height="24" />
              )}
              iconAfter={(item) => (item.user_picks ? <Check /> : <Plus />)}
            />
          </YStack>
        ) : (
          <CategoryList
            categories={categories}
            onPress={(category: string | null) => {
              console.log("Category:", category);
              setCategory(category);
            }}
          />
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
