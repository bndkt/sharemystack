// import { OneSignal } from "react-native-onesignal"; // SDK v5
import OneSignal from "react-native-onesignal";

OneSignal.setLocationShared(false);

// OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string); // SDK v5

OneSignal.setAppId(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string);

export function oneSignalLogin(externalId?: string, email?: string) {
  // externalId && OneSignal.login(externalId); // SDK v5
  externalId && OneSignal.setExternalUserId(externalId);
  // email && OneSignal.User.addEmail(email); // SDK v5
  email && OneSignal.setEmail(email);
}

export function oneSignalLogout() {
  // OneSignal.logout(); // SDK v5
}
