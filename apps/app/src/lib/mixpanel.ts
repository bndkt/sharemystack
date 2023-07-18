import { Mixpanel } from "mixpanel-react-native";

const mixpanel = new Mixpanel(
  process.env.EXPO_PUBLIC_MIXPANEL_TOKEN as string,
  true
);
mixpanel.init();
