import { Model, Relation } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Stack } from "./Stack";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Pick extends Model {
  static table = TableName.PICKS;

  static associations = {
    [TableName.TOOLS]: { type: "belongs_to" as const, key: "tool_id" },
    [TableName.CATEGORIES]: { type: "belongs_to" as const, key: "category_id" },
    [TableName.STACKS]: { type: "belongs_to" as const, key: "stack_id" },
  };

  @immutableRelation(TableName.STACKS, "stack_id") stack!: Relation<Stack>;
  @immutableRelation(TableName.TOOLS, "tool_id") tool!: Relation<Tool>;
  @immutableRelation(TableName.CATEGORIES, "category_id")
  category!: Relation<Category>;

  // @text("tool_id") toolId!: string;
  // @text("tool_name") toolName!: string;
  // @text("tool_icon") toolIcon!: string;
  // @text("category_name") categoryName!: string;
}
