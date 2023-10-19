import { ExpoConfig } from "expo/config";

const projectId = "53d833b3-4c35-4d8f-8b61-123faf914be3";
const name =
  process.env.EXPO_PUBLIC_APP_VARIANT === "production"
    ? "Share My Stack"
    : "SMS Dev";
const bundleIdentifier =
  process.env.EXPO_PUBLIC_APP_VARIANT === "production"
    ? "com.sharemystack"
    : "com.sharemystack.dev";
const scheme =
  process.env.EXPO_PUBLIC_APP_VARIANT === "production"
    ? "sharemystack"
    : "sharemystack-dev";
const sentryProject =
  process.env.EXPO_PUBLIC_APP_VARIANT === "production"
    ? "sharemystack"
    : "sharemystack-dev";

const config: ExpoConfig = {
  name,
  slug: "sharemystack",
  scheme,
  owner: "feldapp",
  version: "1.0.8",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#f43f5e",
  },
  developmentClient: {
    silentLaunch: true,
  },
  updates: {
    enabled: true,
    url: `https://u.expo.dev/${projectId}`,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
    associatedDomains: [
      "applinks:sharemystack.com",
      "appclips:sharemystack.com",
      "webcredentials:sharemystack.com",
      "activitycontinuation:sharemystack.com",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/share-my-stack/id6450111644",
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "Share My Stack uses your location to help you connect with other users nearby and to show you relevant local content.", // Note: The app doesn't use location information, but this has to be included because the OneSignal plugin includes location access logic
      NSCameraUsageDescription:
        "Share My Stack app requires access to your photo library to save generated graphics, enabling you to view and share them at your convenience.",
      LSApplicationQueriesSchemes: [
        "itms",
        "itms-apps",
        "whatsapp",
        "instagram",
        "instagram-stories",
        "fb",
        "facebook-stories",
      ],
    },
  },
  experiments: {
    tsconfigPaths: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId,
    },
  },
  plugins: [
    "sentry-expo",
    // ["react-native-app-clip", { name: "Share My Stack" }],
    [
      "expo-router",
      {
        origin: "https://sharemystack.com",
        // asyncRoutes: "development",
      },
    ],
    "expo-apple-authentication",
    "expo-localization",
    [
      "onesignal-expo-plugin",
      {
        mode:
          process.env.EXPO_PUBLIC_APP_VARIANT === "production"
            ? "production"
            : "development",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          extraPods: [
            {
              name: "simdjson",
              configurations: ["Debug", "Release"],
              path: "../../../node_modules/@nozbe/simdjson",
              modular_headers: true,
            },
          ],
        },
      },
    ],
    [
      "expo-media-library",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
        savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
      },
    ],
  ],
  hooks: {
    postPublish: [
      /* {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "feldapp",
          project: sentryProject,
          setCommits: true,
        },
      }, */
    ],
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};

export default config;
