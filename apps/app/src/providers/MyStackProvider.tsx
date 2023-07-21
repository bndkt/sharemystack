import { ReactNode, createContext } from "react";

import { useRefresh } from "@/hooks/useRefresh";
import { supabase } from "@/lib/supabase";
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
  const { refresh } = useRefresh();

  function addPick(toolId: string, categoryId: string) {
    const query = supabase.from("picks").insert({
      stack_id: stack.id,
      tool_id: toolId,
      category_id: categoryId,
    });

    query.then((result) => {
      console.log({ result });
      refresh();
    });
  }

  function removePick(pickId: string) {
    const query = supabase
      .from("picks")
      .update({ deleted_at: "NOW()" })
      .eq("id", pickId);
    query.then((result) => {
      console.log({ result });
      refresh();
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
