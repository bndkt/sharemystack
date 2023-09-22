import {
  H5,
  Square,
  Text,
  Token,
  XStack,
  YStack,
  useTheme,
  useThemeName,
} from "tamagui";

import { TemplateProps } from ".";
import { IconGrid } from "../IconGrid";

import { Pick } from "@/model/Pick";
import { Logo } from "@/components/Logo";

export function Grid1({
  profile,
  stack,
  options = {},
  width,
  ratio,
  iconGridProps,
}: Omit<TemplateProps, "picks"> & {
  ratio: number;
  iconGridProps: {
    picks: Pick[];
    maxIcons?: number;
    iconSizes?: Map<number, Token>;
  };
}) {
  /* const iconGridProps = useMemo(() => {
    console.log("New props");
    return {
      picks,
      maxIcons,
      iconSizes,
    };
  }, [picks, maxIcons, iconSizes]); */

  /* const grid = useMemo(
    () => <IconGrid picks={picks} maxIcons={maxIcons} iconSizes={iconSizes} />,
    [picks, maxIcons, iconSizes],
  ); */

  const themeName = useThemeName();
  const theme = useTheme();

  return (
    <Square
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
        <IconGrid {...iconGridProps} />
      </YStack>
      <XStack alignItems="center" marginTop="$3" paddingBottom="$3">
        <XStack>
          <Logo width={24} height={24} color="#f43f5e" />
          {/* TODO: Use token for color */}
        </XStack>
        <Text marginLeft="$2">sharemystack.com/@{profile.slug}</Text>
      </XStack>
    </Square>
  );
}
