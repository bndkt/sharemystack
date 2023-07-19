import { Model, Relation } from "@nozbe/watermelondb";
import { immutableRelation, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";

export class Pick extends Model {
  static table = TableName.PICKS;

  static associations = {
    [TableName.TOOLS]: { type: "belongs_to" as const, key: "tool_id" },
    [TableName.CATEGORIES]: { type: "belongs_to" as const, key: "category_id" },
    [TableName.STACKS]: { type: "belongs_to" as const, key: "stack_id" },
  };

  @text("name") name!: string;
  @text("slug") icon!: string;
  @text("starred") starred!: boolean;
  @text("user_id") user!: number;
}
