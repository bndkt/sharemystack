import * as AppleAuthentication from "expo-apple-authentication";
import { useThemeName } from "tamagui";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useSync } from "@/hooks/useSync";

export function SignInWithApple() {
  const { signIn } = useAuth();
  const { reset } = useSync();
  const theme = useThemeName();

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={
        theme === "dark"
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={5}
      style={{
        height: 44,
      }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          if (credential.identityToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "apple",
              token: credential.identityToken,
            });

            if (error) {
              console.error(error);
            } else {
              signIn(data);
              reset();
            }
          }
        } catch (e: any) {
          if (e.code === "ERR_REQUEST_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}
