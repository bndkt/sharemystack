import { ReactNode, createContext } from "react";

import { Pick } from "@/model/Pick";
import { Stack } from "@/model/Stack";

export const MyStackContext = createContext<{
  stack: Stack | null;
  picks?: Pick[];
}>({
  stack: null,
});

export function MyStackProvider({
  stack,
  picks,
  children,
}: {
  stack: Stack;
  picks?: Pick[];
  children: ReactNode;
}) {
  return (
    <MyStackContext.Provider
      value={{
        stack,
        picks,
      }}
    >
      {children}
    </MyStackContext.Provider>
  );
}
