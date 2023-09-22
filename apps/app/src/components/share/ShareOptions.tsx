import { Info } from "@tamagui/lucide-icons";
import { Label, Switch, Text, XStack } from "tamagui";

export type TShareOptions = {
  showTitle?: boolean;
  includeHandle?: boolean;
  darkMode?: boolean;
};

export function ShareOptions({
  options,
  setOptions,
}: {
  options: TShareOptions;
  setOptions: React.Dispatch<React.SetStateAction<TShareOptions>>;
}) {
  const updateOptions = (newOptions: Partial<TShareOptions>) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <XStack gap="$3" alignItems="center" padding="$3" flexWrap="wrap">
      <XStack space="$3" alignItems="center">
        <Switch
          id="showTitleSwitch"
          size="$1"
          native
          checked={options.showTitle}
          onCheckedChange={() =>
            updateOptions({ showTitle: !options.showTitle })
          }
        />
        <Label
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          htmlFor="showTitleSwitch"
        >
          Include title
        </Label>
      </XStack>
      <XStack space="$3" alignItems="center">
        <Switch
          id="includeHandleSwitch"
          size="$1"
          native
          checked={options.includeHandle}
          onCheckedChange={() =>
            updateOptions({ includeHandle: !options.includeHandle })
          }
        />
        <Label
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          htmlFor="includeHandleSwitch"
        >
          Personalize title
        </Label>
      </XStack>
      <XStack space="$3" alignItems="center">
        <Switch
          id="darkModeSwitch"
          size="$1"
          native
          checked={options.darkMode}
          onCheckedChange={() => updateOptions({ darkMode: !options.darkMode })}
        />
        <Label
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          htmlFor="darkModeSwitch"
        >
          Dark mode
        </Label>
      </XStack>
      <XStack paddingHorizontal="$3" alignItems="center">
        <Info size="$1" />
        <Text marginLeft="$3">
          Tip: If you want to exclude a specific tool from the image, just tap
          the icon to hide it.
        </Text>
      </XStack>
    </XStack>
  );
}
