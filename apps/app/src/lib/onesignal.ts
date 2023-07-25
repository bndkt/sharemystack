// import { OneSignal } from "react-native-onesignal"; // SDK v5
import OneSignal from "react-native-onesignal";

// Disable for SDK v5
OneSignal.setLocationShared(false);

// OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string); // SDK v5
OneSignal.setAppId(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string);
