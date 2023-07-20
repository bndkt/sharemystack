import { ReactNode, createContext, useContext } from "react";

import { StackResponse } from "@/lib/database/getStack";

const MyStackContext = createContext<{
  stack: StackResponse["data"] | null;
  addPick: (toolId: string, categoryId: string) => void;
  removePick: (stackId: string) => void;
}>({
  stack: null,
  addPick: () => {},
  removePick: () => {},
});

export function useMyStack() {
  return useContext(MyStackContext);
}

export function MyStackProvider({
  stack,
  addPick,
  removePick,
  children,
}: {
  stack: StackResponse["data"];
  addPick: (toolId: string, categoryId: string) => void;
  removePick: (stackId: string) => void;
  children: ReactNode;
}) {
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
