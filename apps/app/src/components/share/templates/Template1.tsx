import { H5, Separator, Square, Text, XStack, YStack } from "tamagui";

import { ShareOptions } from "../ShareOptions";

import { Logo } from "@/components/Logo";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack as StackModel } from "@/model/Stack";

export function Template1({
  profile,
  stack,
  picks,
  options = {},
}: {
  profile: Profile;
  stack: StackModel;
  picks: Pick[];
  options: ShareOptions;
}) {
  return (
    <YStack paddingHorizontal="$3" backgroundColor="white" alignItems="center">
      {options.showTitle && (
        <H5 textAlign="center" marginTop="$3">
          {options.includeHandle ? `${profile.slug}'s` : "My"}{" "}
          {stack.stackTypeName} Stack
        </H5>
      )}
      <XStack space="$3" paddingBottom="$3" flexWrap="wrap">
        {picks.map((pick) => {
          return (
            <Square
              key={pick.id}
              backgroundColor="white"
              marginTop="$3"
              padding="$3"
              // shadowColor="$gray5"
              // shadowOffset={{ width: 3, height: 3 }}
              elevation="$3"
              radiused={true}
              // shadowRadius={3}
            >
              <CustomSuspense
                promise={pick.tool.fetch()}
                name="icon"
                component={(tool) => (
                  <ToolIcon tool={tool} size="$3" key={pick.id} />
                )}
              />
            </Square>
          );
        })}
      </XStack>
      <XStack alignItems="center" paddingBottom="$3">
        <Text marginLeft="$2">sharemystack.com/@{profile.slug}</Text>
      </XStack>
    </YStack>
  );
}
