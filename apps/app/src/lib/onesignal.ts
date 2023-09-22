import * as StoreReview from "expo-store-review";
import { OneSignal } from "react-native-onesignal";

import { config } from "./config";

OneSignal.initialize(config.oneSignalAppId);

// __DEV__ && OneSignal.Notifications.requestPermission(true);

OneSignal.InAppMessages.addEventListener("click", (event) => {
  if (event.result.actionId === "requestReview") {
    StoreReview.requestReview();
  }
});
