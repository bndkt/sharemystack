# Share My Stack

![Share My Stack Screenshots](https://sharemystack.com/images/banner.webp)

**Curate your personal productivity stack or your favorite development stack. Share it within the app or on social media. Discover what other people are using and get inspired to try out new tools.**

This is the original repository of the app Share My Stack, which you can download from the App Store today:

[![Download on the App Store](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg)](https://apps.apple.com/us/app/share-my-stack/id6450111644)

Share My Stack is also launching on Product Hunt today, please check it out:

<a href="https://www.producthunt.com/posts/share-my-stack?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-share&#0045;my&#0045;stack" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=415351&theme=light" alt="Share&#0032;My&#0032;Stack - Share&#0032;your&#0032;stack&#0032;with&#0032;the&#0032;world | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

To find out more about Share My Stack, check out [https://sharemystack.com](https://sharemystack.com)

> [!NOTE]
> This app (and all code in this repo) was created by Benedikt Müller ([@bndkt](https://x.com/bndkt), [bndkt.com](https://bndkt.com)). I'm making this repo accessible for educational purposes and as inspiration, but without license. I'm **available for freelance work** in React and React Native projects, please reach out to me at [hello@bndkt.com](hello@bndkt.com).

## This repo includes:

- [apps/app](./apps/app): The app itself (React Native)
- [apps/content](./apps/content): Sanity Studio (to edit editorial content shown in the app)
- [apps/video](./apps/video): A Remotion project (to generate mockups and videos for marketing)
- [apps/web](./apps/web): The landing page (Remix)
- [assets](./assets): Static data for the app (categories, tools, icons)
- [packages/seed-data-action](./packages/seed-data-action): A custom GitHub actions to seed the static data into Supabase
- [.github/workflows](./.github/workflows): GitHub actions for CI and to deploy to Expo (build the mobile app) and Cloudflare (website)

## Built with

- [Expo SDK 50](https://github.com/expo/expo/)
- [Expo Router 3](https://github.com/expo/expo/tree/main/packages/expo-router)
- [React Native 0.72](https://github.com/facebook/react-native)
- [Tamagui](https://github.com/tamagui/tamagui)
- [Supabase](https://github.com/supabase/supabase-js)
- [React Native Bottom Sheet 5](https://github.com/gorhom/react-native-bottom-sheet)
- [WatermelonDB](https://github.com/Nozbe/WatermelonDB)
- [Remix 2](https://github.com/remix-run)
- [Remotion 4](https://github.com/remotion-dev/remotion)

## Planned technical enhancements

- [ ] iOS App Clips (using [react-native-app-clip](https://github.com/bndkt/react-native-app-clip))
- [ ] iOS Widgets/Live Activities (using [react-native-widget-extension](https://github.com/bndkt/react-native-widget-extension))
- [ ] iOS Handoff (using [Expo Router](https://github.com/expo/expo/tree/main/packages/expo-router))
- [ ] Web App powered by React Native Web (using [Expo Router](https://github.com/expo/expo/tree/main/packages/expo-router))
