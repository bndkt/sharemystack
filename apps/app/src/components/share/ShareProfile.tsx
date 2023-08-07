import { Text } from "tamagui";

import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function ShareProfile({
  profile,
  stacks,
}: {
  profile: Profile;
  stacks: Stack[];
}) {
  return (
    <Text textAlign="center" marginTop="$3">
      Share profile. Coming soon.
    </Text>
  );
}
