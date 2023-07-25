import { OneSignal } from "react-native-onesignal";

OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string);

export function oneSignalLogin(userExternalId?: string, email?: string) {
  userExternalId && OneSignal.login(userExternalId);
  email && OneSignal.User.addEmail(email);
}

export function oneSignalLogout() {
  OneSignal.logout();
}
