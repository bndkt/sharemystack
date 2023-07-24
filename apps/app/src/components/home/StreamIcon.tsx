import { useEffect, useState } from "react";
import { Avatar } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export function StreamIcon({ pick }: { pick: Pick }) {
  const [tool, setTool] = useState<Tool>();

  useEffect(() => {
    const subscription = pick.tool.observe().subscribe((newTool) => {
      setTool(newTool);
    });

    return () => subscription.unsubscribe();
  }, [pick]);

  return tool ? <ToolIcon tool={tool} /> : <Avatar />;
}
