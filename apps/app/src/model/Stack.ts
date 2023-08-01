import { Model, Q, Relation } from "@nozbe/watermelondb";
import {
  date,
  immutableRelation,
  lazy,
  readonly,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Pick } from "./Pick";
import { Profile } from "./Profile";
import { StackType } from "./StackType";
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

  @text("stack_type_name") stackTypeName!: string;
  @text("stack_type_slug") stackTypeSlug!: string;
  @text("stack_type_icon_name") stackTypeIconName!: string;

  @immutableRelation(TableName.PROFILES, "profile_id")
  profile!: Relation<Profile>;
  @immutableRelation(TableName.STACK_TYPES, "stack_type_id")
  stackType!: Relation<StackType>;

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("stack_id", this.id));

  @writer async addPick(tool: Tool, category: Category) {
    const newPick = await this.collections.get<Pick>("picks").create((pick) => {
      pick.stack.set(this);
      pick.tool.set(tool);
      pick.category.set(category);
      pick.toolName = tool.name;
      pick.toolSlug = tool.slug;
      pick.stackTypeIconName = this.stackTypeIconName;
      pick.stackTypeName = this.stackTypeName;
      pick.stackTypeSlug = this.stackTypeSlug;
      pick.categoryName = category.name;
      pick.categorySlug = category.slug;
    });
    return newPick;
  }

  @writer async removePick(pick: Pick) {
    // const newPick = await this.collections.get<Pick>("picks").find(pick.id);
    pick.markAsDeleted();
    // return newPick;
  }
}
