import { usePostHog } from "posthog-react-native";
import { OneSignal } from "react-native-onesignal";
import * as Sentry from "sentry-expo";
import { identifyDevice } from "vexo-analytics";

export function useAnalytics() {
  const postHog = usePostHog();

  function identify({ id, email }: { id?: string; email?: string }) {
    id && OneSignal.login(id);
    email && OneSignal.User.addEmail(email);
    id && identifyDevice(id);
    id && postHog?.identify(id, { email });
    Sentry.Native.setUser({ id, email });
  }

  function logout() {
    OneSignal.logout();
    Sentry.Native.setUser(null);
  }

  function capture(event: string, properties?: Record<string, any>) {
    postHog?.capture(event, properties);
  }

  function addTag(key: string, value: string) {
    if (value === "now()") {
      value = Math.floor(Date.now() / 1000).toString();
    }

    OneSignal.User.addTag(key, value);
  }

  function addTrigger(key: string, value: string) {
    OneSignal.InAppMessages.addTrigger(key, value);
  }

  return { identify, logout, capture, addTag, addTrigger };
}
