import { Twitter } from "@tamagui/lucide-icons";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Button, YStack } from "tamagui";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri();

export function SignInButton() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const { signIn } = useAuth();

  async function prepareAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.error(error);
    }

    if (data?.url) {
      setAuthUrl(data.url);
    }
  }

  useEffect(() => {
    prepareAuth();
  }, []);

  async function signInWithTwitter() {
    if (authUrl) {
      const res = await WebBrowser.openAuthSessionAsync(authUrl);
      if (res.type === "success") {
        const { url } = res;
        const { params, errorCode } = QueryParams.getQueryParams(url);

        if (errorCode) {
          console.error(errorCode);
        }

        const { access_token, refresh_token } = params;

        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error(error);
        } else {
          signIn(data);
        }
      }
    }
  }

  return (
    <YStack padding="$3" space="$3">
      <Button
        disabled={!authUrl}
        onPress={() => {
          signInWithTwitter();
        }}
        backgroundColor={"#1D9BF0"}
        color="#FFFFFF"
        icon={<Twitter color="#FFFFFF" />}
      >
        Sign in with Twitter
      </Button>
      {/* <Button
        onPress={async () => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: "test@sharemystack.com",
            password: "test",
          });

          if (error) {
            console.error(error);
          } else {
            signIn(data);
          }
        }}
      >
        Sign in (DEV)
      </Button> */}
    </YStack>
  );
}
