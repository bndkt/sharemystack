import { Trash2 } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { ListItem } from "tamagui";

import { Loading } from "../Loading";
import { ToolIcon } from "../icons/ToolIcon";
import { SwipeableRow } from "../list/SwipeableRow";

import { useAuth } from "@/hooks/useAuth";
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
  const { stack } = useAuth();

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
                onPress: () => {
                  stack?.removePick(pick);
                },
              },
            ]
          : undefined
      }
    >
      <ListItem
        title={tool.name}
        subTitle={category.name}
        icon={<ToolIcon tool={tool} width="36" height="36" />}
      />
    </SwipeableRow>
  ) : (
    <Loading />
  );
}
