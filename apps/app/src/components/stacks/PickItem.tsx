import { Trash2 } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { ListItem } from "tamagui";

import { Loading } from "../Loading";
import { SwipeableRow } from "../SwipeableRow";
import { ToolIcon } from "../icons/ToolIcon";

import { useMyStack } from "@/hooks/useMyStack";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export function PickItem({
  pick,
  editable,
}: {
  pick: Pick;
  editable?: boolean;
}) {
  const [tool, setTool] = useState<Tool>();
  const [category, setCategory] = useState<Category>();
  const { stack } = useMyStack();

  useEffect(() => {
    const subscription = pick.tool.observe().subscribe((newTool) => {
      setTool(newTool);
    });

    return () => subscription.unsubscribe();
  }, [pick]);

  useEffect(() => {
    const subscription = pick.category.observe().subscribe((newCategory) => {
      setCategory(newCategory);
    });

    return () => subscription.unsubscribe();
  }, [pick]);

  return tool && category ? (
    <SwipeableRow
      rightActions={
        editable
          ? [
              {
                text: <Trash2 color="white" />,
                color: "$red10",
                onPress: () => stack?.removePick(pick),
              },
            ]
          : undefined
      }
    >
      <ListItem
        title={tool.name}
        subTitle={category.name}
        icon={<ToolIcon svgXml={tool.icon} width="36" height="36" />}
      />
    </SwipeableRow>
  ) : (
    <Loading />
  );
}
