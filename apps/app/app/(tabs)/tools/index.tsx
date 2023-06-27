import { useEffect, useState } from "react";
import { Spinner } from "tamagui";

import { ToolsResponse, getTools } from "@/lib/database/getTools";
import { ToolList } from "@/components/tools/ToolList";

export default function Tools() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);

  useEffect(() => {
    getTools().then(({ data }) => {
      setTools(data);
      setLoading(false);
    });
  }, [getTools, setTools]);

  return isLoading ? <Spinner /> : <ToolList tools={tools} />;
}
