export const config = {
  domain: "https://sharemystack.com",
  feedbackLink: "https://sharemystack.canny.io/",
  postHogApiKey: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  oneSignalAppId: process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID as string,
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN as string,
  vexoApiKey: process.env.EXPO_PUBLIC_VEXO_API_KEY as string,
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
};
