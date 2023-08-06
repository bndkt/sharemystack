import { PlusCircle } from "@tamagui/lucide-icons";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import { Button } from "tamagui";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function SuggestionButton({
  suggestion = "tool",
  text,
  icon,
}: {
  suggestion?: string;
  text?: string;
  icon?: JSX.Element;
}) {
  const { user, profile } = useAuth();

  async function getCannyUrl() {
    const { data, error } = await supabase.functions.invoke<{
      jwt?: string | null;
    }>("get-canny-token", {
      body: { name: "Functions" },
    });

    if (data?.jwt) {
      // https://sharemystack.com/auth/sso?companyID=6482cf4b2e5e451d99d96fec&redirect=https%3A%2F%2Fsharemystack.canny.io%2F
      const companyId = "6482cf4b2e5e451d99d96fec";
      const redirect = "https%3A%2F%2Fsharemystack.canny.io%2F";
      const ssoToken = data.jwt;
      console.log({ ssoToken });
      const cannyUrl =
        "https://canny.io/api/redirects/sso?companyID=" +
        companyId +
        "&ssoToken=" +
        ssoToken +
        "&redirect=" +
        redirect;

      return cannyUrl;
    } else {
      return null;
    }
  }

  async function handleButtonPress() {
    if (user && profile) {
      const cannyUrl = await getCannyUrl();

      if (cannyUrl) {
        WebBrowser.openBrowserAsync(cannyUrl);

        return;
      }
    }

    Alert.alert("Please create a profile before submitting feedback.");
  }

  return (
    <Button
      onPress={handleButtonPress}
      icon={icon ?? <PlusCircle size="$1" />}
      margin="$3"
      color={user && profile ? undefined : "$gray10"}
    >
      {text ?? `Suggest new ${suggestion}`}
    </Button>
  );
}
