import { YStack } from "tamagui";

import { SignIn } from "../../../components/SignIn";
import {
  useAuth,
  useProtectedRoute,
} from "../../../components/providers/AuthProvider";
import { SignOutButton } from "../../../components/providers/SignOutButton";

export default function Index() {
  const { session } = useAuth();

  useProtectedRoute();

  return <YStack>{session ? <SignOutButton /> : <SignIn />}</YStack>;
}
