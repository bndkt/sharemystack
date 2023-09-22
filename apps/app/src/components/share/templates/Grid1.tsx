import { H5, Text, XStack, YStack, useThemeName } from "tamagui";

import { TemplateProps } from ".";
import { IconGrid } from "../IconGrid";

import { Logo } from "@/components/Logo";

export function Grid1({
  profile,
  stack,
  options = {},
  width,
  picks,
  ratio,
}: TemplateProps & { ratio: number }) {
  const themeName = useThemeName();

  return (
    <YStack justifyContent="center" flexGrow={1}>
      <YStack
        paddingHorizontal="$3"
        backgroundColor={themeName === "dark" ? "black" : "white"}
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
          <IconGrid picks={picks} width={width} ratio={ratio} />
        </YStack>
        <XStack alignItems="center" marginTop="$3" paddingBottom="$3">
          <XStack>
            <Logo width={24} height={24} color="#f43f5e" />
            {/* TODO: Use token for color */}
          </XStack>
          <Text marginLeft="$2">sharemystack.com/@{profile.slug}</Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
