import { H5, Square, Text, Token, XStack, YStack } from "tamagui";

import { TemplateProps } from ".";

import { IconGrid } from "../IconGrid";
import { useMemo } from "react";

export function Grid1({
  profile,
  stack,
  picks,
  options = {},
  width,
  ratio,
  maxIcons,
  iconSizes,
}: TemplateProps & {
  ratio: number;
  maxIcons?: number;
  iconSizes?: Map<number, Token>;
}) {
  const grid = useMemo(
    () => <IconGrid picks={picks} maxIcons={maxIcons} iconSizes={iconSizes} />,
    [picks, maxIcons, iconSizes]
  );

  return (
    <Square
      paddingHorizontal="$3"
      backgroundColor="white"
      alignItems="center"
      width={width}
      height={width / ratio}
    >
      {options.showTitle && (
        <H5 textAlign="center" marginTop="$3">
          {options.includeHandle ? `${profile.slug}'s` : "My"}{" "}
          {stack.stackTypeName} Stack
        </H5>
      )}
      <YStack flexGrow={1} justifyContent="center">
        {grid}
      </YStack>
      <XStack alignItems="center" marginTop="$3" paddingBottom="$3">
        <Text marginLeft="$2">sharemystack.com/@{profile.slug}</Text>
      </XStack>
    </Square>
  );
}
