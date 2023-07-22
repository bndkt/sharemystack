import { Model, Relation } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";

import { Stack } from "./Stack";
import { TableName } from "./schema";

export class Star extends Model {
  static table = TableName.STARS;

  static associations = {
    [TableName.STACKS]: { type: "belongs_to" as const, key: "stack_id" },
  };

  @immutableRelation(TableName.STACKS, "stack_id") stack!: Relation<Stack>;

  @text("user_id") userId!: string;
  // @text("tool_name") toolName!: string;
  // @text("tool_icon") toolIcon!: string;
  // @text("category_name") categoryName!: string;
}
