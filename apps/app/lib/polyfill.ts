// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html#getting-started
// import "react-native-get-random-values";
import { Platform } from "react-native";
import { setupURLPolyfill } from "react-native-url-polyfill";

Platform.OS !== "web" && setupURLPolyfill();
