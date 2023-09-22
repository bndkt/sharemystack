import { memo, useState } from "react";
import { Square, XStack } from "tamagui";

import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";

export const IconGrid = memo(
  ({
    picks,
    maxIcons,
    width,
    ratio,
  }: {
    picks: Pick[];
    maxIcons?: number;
    width: number;
    ratio: number;
  }) => {
    const factor = 10 * ratio;
    const iconWidth = Math.floor(width / factor);

    return (
      <XStack
        marginTop="$3"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="$3"
      >
        {picks.map((pick) => {
          const [hide, setHide] = useState(false);

          return hide ? null : (
            <Square
              key={pick.id}
              backgroundColor="$background"
              padding="$2"
              borderColor="$borderColor"
              borderWidth="$1"
              elevation="$3"
              radiused={true}
              onPress={() => setHide(true)}
            >
              <CustomSuspense
                promise={pick.tool.fetch()}
                name="icon"
                component={(tool) => (
                  <ToolIcon tool={tool} size={iconWidth} key={pick.id} />
                )}
              />
            </Square>
          );
        })}
      </XStack>
    );
  },
);
