import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet } from "react-native";
// import * as Crypto from "expo-crypto";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function SignInWithApple() {
  const { signIn } = useAuth();
  // const nonce = Crypto.randomUUID();

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            // nonce,
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          if (credential.identityToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "apple",
              token: credential.identityToken,
              // nonce,
            });

            if (error) {
              console.error(error);
            } else {
              signIn(data);
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

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 44,
  },
});
