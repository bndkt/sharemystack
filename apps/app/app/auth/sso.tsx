import { Button, Text, YStack } from "tamagui";

import { AuthSwitch } from "../../components/auth/AuthSwitch";

export default function SSO() {
  return (
    <YStack>
      <Text>SSO</Text>
      <AuthSwitch>
        <Button onPress={() => {}}>Authenticate</Button>
      </AuthSwitch>
    </YStack>
  );
}
