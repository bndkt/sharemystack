import { MyProfile } from "../../../components/profile/MyProfile";
import { AuthSwitch } from "../../../components/auth/AuthSwitch";

export default function Index() {
  return (
    <AuthSwitch>
      <MyProfile />
    </AuthSwitch>
  );
}
