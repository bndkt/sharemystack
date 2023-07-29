import { Alert } from "react-native";
import { Button } from "tamagui";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function DeleteUserButton() {
  const { signOut } = useAuth();

  async function deleteUser() {
    Alert.prompt(
      "Are you sure you want to delete your account? All your data will be lost.",
      "Type DELETE to confirm",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async (text) => {
            console.log("delete", text);
            if (text === "DELETE") {
              const result = await supabase.rpc("delete_user");
              console.log(result);
              signOut();
            } else {
              Alert.alert(
                "Confirmation failed",
                "You didn't type DELETE correctly."
              );
            }
          },
        },
      ],
      "plain-text"
    );
    console.log("deleteUser");
  }

  return (
    <Button onPress={deleteUser} marginTop="$3">
      Delete account
    </Button>
  );
}
