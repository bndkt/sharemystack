import { Model, Q } from "@nozbe/watermelondb";
import { date, lazy, readonly, writer } from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Pick } from "./Pick";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Stack extends Model {
  static table = TableName.STACKS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "stack_id",
    },
    [TableName.STACK_TYPES]: {
      type: "belongs_to" as const,
      key: "stack_type_id",
    },
  };

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("stack_id", this.id));

  @writer async addPick(tool: Tool, category: Category) {
    const newPick = await this.collections.get<Pick>("picks").create((pick) => {
      pick.stack.set(this);
      pick.tool.set(tool);
      pick.category.set(category);
    });
    return newPick;
  }

  @writer async removePick(pick: Pick) {
    // const newPick = await this.collections.get<Pick>("picks").find(pick.id);
    pick.markAsDeleted();
    // return newPick;
  }
}
