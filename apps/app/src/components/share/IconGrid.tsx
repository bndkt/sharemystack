import { Square, Token, XStack } from "tamagui";

import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";

export function IconGrid({
  picks,
  maxIcons,
  iconSizes,
}: {
  picks: Pick[];
  maxIcons?: number;
  iconSizes?: Map<number, Token>;
}) {
  maxIcons ??= 20;
  iconSizes ??= new Map<number, Token>([
    [3, "$8"],
    [10, "$5"],
    [20, "$3"],
  ]);

  picks = picks.slice(0, maxIcons);

  const sortedIconSizes: Map<number, Token> = new Map(
    Array.from(iconSizes).sort(([aKey], [bKey]) => aKey - bKey)
  );

  let iconSize: Token = "$3";
  sortedIconSizes.forEach((value, key) => {
    if (picks.length < key) {
      iconSize = value;
    }
  });

  return (
    <XStack
      marginTop="$3"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap="$3"
    >
      {picks.map((pick) => {
        return (
          <Square
            key={pick.id}
            backgroundColor="$background"
            padding="$3"
            // shadowColor="red"
            // shadowOffset={{ width: 3, height: 3 }}
            borderColor="$borderColor"
            borderWidth="$1"
            elevation="$3"
            radiused={true}
            // shadowRadius={3}
          >
            <CustomSuspense
              promise={pick.tool.fetch()}
              name="icon"
              component={(tool) => (
                <ToolIcon tool={tool} size={iconSize} key={pick.id} />
              )}
            />
          </Square>
        );
      })}
    </XStack>
  );
}
