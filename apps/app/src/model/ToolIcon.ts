import { Model } from "@nozbe/watermelondb";
import { date, readonly, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";

export class ToolIcon extends Model {
  static table = TableName.TOOL_ICONS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @text("icon_svg") iconSvg!: string;
}
