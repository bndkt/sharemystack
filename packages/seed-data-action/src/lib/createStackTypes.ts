import { supabase } from "./supabase.js";
import { stackTypes } from "./data.js";
import { RecordIds } from "../types/types.js";

export async function createStackTypes() {
  const stackTypeRecordIds: RecordIds = {};

  for (const slug of Object.keys(stackTypes)) {
    const stackType = stackTypes[slug];

    const { data: stackTypeRecords, error } = await supabase
      .from("stack_types")
      .upsert(
        {
          slug,
          name: stackType.name,
          icon_name: stackType.iconName,
          is_coming_soon: stackType.isComingSoon,
          updated_at: "now()",
          last_modified_at: "now()",
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) console.error(error);

    if (stackTypeRecords) {
      for (const stackTypeRecord of stackTypeRecords) {
        stackTypeRecordIds[stackTypeRecord.slug] = stackTypeRecord.id;
      }
    }
  }

  return stackTypeRecordIds;
}
