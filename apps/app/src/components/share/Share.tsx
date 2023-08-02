import { Text, XStack, YStack } from "tamagui";

import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";

export function Share({ picks }: { picks: Pick[] }) {
  return (
    <>
      <Text>Share My Stack</Text>
      <XStack>
        {picks.map((pick) => {
          return (
            <CustomSuspense
              promise={pick.tool.fetch()}
              name="icon"
              component={(tool) => (
                <ToolIcon tool={tool} size="$1.5" key={pick.id} />
              )}
            />
          );
        })}
      </XStack>
    </>
  );
}
