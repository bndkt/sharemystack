import { OneSignal } from "react-native-onesignal";

import { config } from "./config";

OneSignal.initialize(config.oneSignalAppId);
