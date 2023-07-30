import { Stack, useLocalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { UpdatePicksList } from "@/components/picks/UpdatePicksList";
import { useCategory } from "@/hooks/data/useCategory";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function CategoryTools() {
  const { category: slug, stackType: stackTypeSlug } = useLocalSearchParams<{
    category: string;
    stackType: string;
  }>();
  const { user } = useAuth();

  if (!slug) throw new Error("No category slug provided");

  const { category, tools } = useCategory({ slug });
  const { stack, picks } = useProfile({ user, stackTypeSlug });

  return (
    <>
      <Stack.Screen
        options={{ title: category?.name ?? "", headerBackTitle: "Categories" }}
      />
      <CustomSuspense
        data={stack}
        name="stack"
        component={(stack) => (
          <CustomSuspense
            data={category}
            name="category"
            component={(category) => (
              <CustomSuspense
                data={picks}
                name="tools"
                component={(picks) => (
                  <CustomSuspense
                    data={tools}
                    name="tools"
                    component={(tools) => (
                      <UpdatePicksList
                        tools={tools}
                        picks={picks}
                        category={category}
                        stack={stack}
                      />
                    )}
                  />
                )}
              />
            )}
          />
        )}
      />
    </>
  );
}
