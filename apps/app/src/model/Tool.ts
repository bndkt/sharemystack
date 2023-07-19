import { Model, Q } from "@nozbe/watermelondb";
import { lazy, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";

export class Tool extends Model {
  static table = TableName.TOOLS;

  static associations = {
    [TableName.CATEGORIZATIONS]: {
      type: "has_many" as const,
      foreignKey: "tool_id",
    },
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "tool_id",
    },
  };

  @text("name") name!: string;
  @text("icon") icon!: string;
  @text("user_picks") userPicks!: number;
  @text("all_picks") allPicks!: number;

  @lazy
  categories = this.collections
    .get("categories")
    .query(Q.on("categorizations", "tool_id", this.id));
}
