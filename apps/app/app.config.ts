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

const config: ExpoConfig = {
  name,
  slug: "sharemystack",
  scheme,
  owner: "feldapp",
  version: "1.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#f43f5e",
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
      NSCameraUsageDescription:
        "Share My Stack app requires access to your photo library to save generated graphics, enabling you to view and share them at your convenience.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: bundleIdentifier,
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
    "expo-apple-authentication",
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
  runtimeVersion: {
    policy: "sdkVersion",
  },
};

export default config;
