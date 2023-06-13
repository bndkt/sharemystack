import { AuthSwitch } from "../../../../components/auth/AuthSwitch";
import MyStack from "../../../../components/stacks/MyStack";

export default function Index() {
  return (
    <AuthSwitch>
      <MyStack />
    </AuthSwitch>
  );
}
