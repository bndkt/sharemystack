import { Model, Q, Relation } from "@nozbe/watermelondb";
import {
  date,
  lazy,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";

import { Pick } from "./Pick";
import { TableName } from "./schema";
import { ToolIcon } from "./ToolIcon";

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

  @relation(TableName.TOOL_ICONS, "tool_icon_id")
  toolIcon?: Relation<ToolIcon>;

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("color") color?: string;
  @text("affiliate_link") affiliateLink?: string;
  @text("app_store") appStore?: string;
  @text("website") website?: string;
  @text("all_picks") allPicks!: number;

  @lazy
  categories = this.collections
    .get(TableName.CATEGORIES)
    .query(Q.on(TableName.CATEGORIZATIONS, "tool_id", this.id));

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("tool_id", this.id));
}
