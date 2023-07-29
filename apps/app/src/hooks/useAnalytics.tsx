import { usePostHog } from "posthog-react-native";
import OneSignal from "react-native-onesignal";
import vexo from "vexo-analytics";
// import { OneSignal } from "react-native-onesignal"; // SDK v5
import * as Sentry from "sentry-expo";

export function useAnalytics() {
  const posthog = usePostHog();

  function identify(externalId?: string, email?: string) {
    // externalId && OneSignal.login(externalId); // SDK v5
    externalId && OneSignal.setExternalUserId(externalId);
    // email && OneSignal.User.addEmail(email); // SDK v5
    email && OneSignal.setEmail(email);
    externalId && vexo.identifyDevice(externalId);
    externalId && posthog?.identify(externalId, { email });
    Sentry.React.setUser({ id: externalId, email });
  }

  function logout() {
    // OneSignal.logout(); // SDK v5
    Sentry.React.setUser(null);
  }

  function capture(event: string, properties?: Record<string, any>) {
    posthog?.capture(event, properties);
  }

  return { identify, logout, capture };
}
