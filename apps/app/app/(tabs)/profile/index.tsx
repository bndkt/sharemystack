import { YStack } from "tamagui";

import { SignIn } from "../../../components/SignIn";
import {
  useAuth,
  useProtectedRoute,
} from "../../../components/providers/AuthProvider";
import { MyProfile } from "../../../components/profile/MyProfile";

export default function Index() {
  const { session, user } = useAuth();

  useProtectedRoute();

  return <YStack>{session ? <MyProfile /> : <SignIn />}</YStack>;
}
