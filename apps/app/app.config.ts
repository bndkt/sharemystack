import { ExpoConfig } from "expo/config";

const projectId = "c68d7a2f-d33a-4220-b4c3-148177066a75";
const name =
  process.env.APP_VARIANT === "production" ? "Share My Stack" : "SMS Dev";
const bundleIdentifier =
  process.env.APP_VARIANT === "production"
    ? "com.sharemystack"
    : "com.sharemystack.dev";
const scheme =
  process.env.APP_VARIANT === "production"
    ? "sharemystack"
    : "sharemystack-dev";

const hooks: ExpoConfig["hooks"] = { postPublish: [] };

if (process.env.SENTRY_AUTH_TOKEN) {
  hooks.postPublish?.push({
    file: "sentry-expo/upload-sourcemaps",
    config: {
      organization: "feldapp",
      project: "sharemystack",
    },
  });
}

const config: ExpoConfig = {
  name,
  slug: "sharemystack",
  scheme,
  owner: "mueller",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
    dark: {
      backgroundColor: "#000000",
    },
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
    [
      "onesignal-expo-plugin",
      {
        mode:
          process.env.APP_VARIANT === "production"
            ? "production"
            : "development",
      },
    ],
  ],
  hooks,
  runtimeVersion: {
    policy: "sdkVersion",
  },
};

export default config;
