import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { ToolList } from "@/components/tools/ToolList";
import { ToolsResponse, getTools } from "@/lib/database/getTools";

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
