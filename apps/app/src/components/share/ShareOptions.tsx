import { Label, Switch, XStack } from "tamagui";

export type ShareOptions = {
  showTitle?: boolean;
  includeHandle?: boolean;
};

export function ShareOptions({
  options,
  setOptions,
}: {
  options: ShareOptions;
  setOptions: React.Dispatch<React.SetStateAction<ShareOptions>>;
}) {
  const updateOptions = (newOptions: Partial<ShareOptions>) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <XStack space="$3" alignItems="center" padding="$3">
      <Switch
        id="showTitleSwitch"
        size="$4"
        native
        checked={options.showTitle}
        onCheckedChange={() => updateOptions({ showTitle: !options.showTitle })}
      />
      <Label
        paddingRight="$0"
        minWidth={90}
        justifyContent="flex-end"
        htmlFor="showTitleSwitch"
      >
        Include title
      </Label>
      <Switch
        id="includeHandleSwitch"
        size="$4"
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
  );
}
