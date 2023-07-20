import { ReactNode, createContext } from "react";

import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";
import { Stack } from "@/model/Stack";

export const MyStackContext = createContext<{
  stack: Stack | null;
  addPick: (toolId: string, categoryId: string) => void;
  removePick: (stackId: string) => void;
}>({
  stack: null,
  addPick: () => {},
  removePick: () => {},
});

export function MyStackProvider({
  stack,
  children,
}: {
  stack: Stack;
  children: ReactNode;
}) {
  function addPick(toolId: string, categoryId: string) {
    const query = supabase.from("picks").insert({
      stack_id: stack.id,
      tool_id: toolId,
      category_id: categoryId,
    });

    query.then((result) => {
      console.log({ result });
      sync();
    });
  }

  function removePick(pickId: string) {
    const query = supabase
      .from("picks")
      .update({ deleted_at: "NOW()" })
      .eq("id", pickId);
    query.then((result) => {
      console.log({ result });
      sync();
    });
  }

  return (
    <MyStackContext.Provider
      value={{
        stack,
        addPick,
        removePick,
      }}
    >
      {children}
    </MyStackContext.Provider>
  );
}
