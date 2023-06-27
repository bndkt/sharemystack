import { useEffect, useState } from "react";

import { ToolsResponse, getTools } from "@/lib/database/getTools";
import { ToolList } from "@/components/tools/ToolList";
import { Loading } from "@/components/Loading";

export default function Tools() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);

  useEffect(() => {
    getTools().then(({ data }) => {
      setTools(data);
      setLoading(false);
    });
  }, [getTools, setTools]);

  return isLoading ? <Loading /> : <ToolList tools={tools} />;
}
