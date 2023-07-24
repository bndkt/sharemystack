import { Model, Q } from "@nozbe/watermelondb";
import { date, lazy, readonly, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";

export class Tool extends Model {
  static table = TableName.TOOLS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

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
  @text("slug") slug!: string;
  @text("icon") icon!: string;
  @text("color") color!: string;
  @text("user_picks") userPicks!: number;
  @text("all_picks") allPicks!: number;

  @lazy
  categories = this.collections
    .get("categories")
    .query(Q.on("categorizations", "tool_id", this.id));
}
