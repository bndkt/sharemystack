import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  immutableRelation,
  readonly,
  text,
} from "@nozbe/watermelondb/decorators";

import { Stack } from "./Stack";
import { TableName } from "./schema";

export class Star extends Model {
  static table = TableName.STARS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.STACKS]: { type: "belongs_to" as const, key: "stack_id" },
  };

  @immutableRelation(TableName.STACKS, "stack_id") stack!: Relation<Stack>;

  @text("user_id") userId!: string;
}
