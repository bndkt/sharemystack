import { usePostHog } from "posthog-react-native";
import OneSignal from "react-native-onesignal";
import * as Sentry from "sentry-expo";
import { identifyDevice } from "vexo-analytics";
// import { OneSignal } from "react-native-onesignal"; // SDK v5

export function useAnalytics() {
  const postHog = usePostHog();

  function identify({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }) {
    // externalId && OneSignal.login(id); // SDK v5
    id && OneSignal.setExternalUserId(id);
    // email && OneSignal.User.addEmail(email); // SDK v5
    email && OneSignal.setEmail(email);
    id && identifyDevice(id);
    id && postHog?.identify(id, { email, username });
    Sentry.Native.setUser({ id, email, username });
  }

  function logout() {
    // OneSignal.logout(); // SDK v5
    Sentry.Native.setUser(null);
  }

  function capture(event: string, properties?: Record<string, any>) {
    postHog?.capture(event, properties);
  }

  return { identify, logout, capture };
}
