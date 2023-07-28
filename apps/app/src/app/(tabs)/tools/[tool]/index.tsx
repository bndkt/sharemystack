import { Button, Text, YStack } from "tamagui";
import * as Linking from "expo-linking";

export default function Index() {
  function appStore() {
    const link =
      "itms-apps://apps.apple.com/us/app/1password-password-manager/id1511601750";
    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  }

  return (
    <YStack fullscreen padding="$3">
      <Text textAlign="center" marginTop="$6">
        Coming soon …
      </Text>
      <Button onPress={appStore}>App Store</Button>
    </YStack>
  );
}
