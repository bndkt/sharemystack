import { Mixpanel } from "mixpanel-react-native";

import { config } from "./config";

const mixpanel = new Mixpanel(config.mixpanelToken, true);
mixpanel.init();
