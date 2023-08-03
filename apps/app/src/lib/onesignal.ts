// import { OneSignal } from "react-native-onesignal"; // SDK v5
import OneSignal from "react-native-onesignal";

import { config } from "./config";

// Disable for SDK v5
OneSignal.setLocationShared(false);

// OneSignal.initialize(config.oneSignalAppId); // SDK v5
OneSignal.setAppId(config.oneSignalAppId);
