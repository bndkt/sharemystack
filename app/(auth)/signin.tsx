import { View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";

import { supabase } from "../../lib/supabase";
import { Button } from "tamagui";
import { useLocalSearchParams } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri({
  scheme: "sharemystack",
});

export default function SignIn() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const searchParams = useLocalSearchParams();

  console.log({ searchParams });

  async function prepareAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        scopes: "tweet.read,offline.access",
      },
    });

    console.log({ data });

    if (data?.url) {
      setAuthUrl(data.url);
    }
  }

  useEffect(() => {
    prepareAuth();
  }, []);

  async function signIn() {
    if (authUrl) {
      const res = await WebBrowser.openAuthSessionAsync(
        authUrl,
        Linking.createURL("/signin")
      );
      if (res.type === "success") {
        const { url } = res;
        const { params, errorCode } = QueryParams.getQueryParams(url);
        const { access_token, refresh_token } = params;

        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        console.log({ data, error });
      }
    }
  }

  return (
    <View>
      <Text>Home Feed</Text>

      <Button
        disabled={!authUrl}
        onPress={() => {
          signIn();
        }}
      >
        Sign in
      </Button>
    </View>
  );
}
