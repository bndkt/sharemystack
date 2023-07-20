import { useContext } from "react";

import { MyStackContext } from "@/providers/MyStackProvider";

export function useMyStack() {
  return useContext(MyStackContext);
}
