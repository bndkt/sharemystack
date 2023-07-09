import { ExpoConfig } from "expo/config";

const projectId = "c68d7a2f-d33a-4220-b4c3-148177066a75";

const config: ExpoConfig = {
  name: "Share My Stack",
  slug: "sharemystack",
  scheme: "sharemystack",
  owner: "mueller",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
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
    bundleIdentifier: "com.sharemystack",
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
    ["expo-router", { headOrigin: "https://sharemystack.com" }],
    "expo-apple-authentication",
  ],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "feldapp",
          project: "sharemystack",
        },
      },
    ],
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};

export default config;
