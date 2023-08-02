import { supabase } from "./supabase.js";
import { stackTypes } from "./data.js";

export function createStackTypes() {
  Object.keys(stackTypes).forEach(async (slug) => {
    const stackType = stackTypes[slug];

    await supabase
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
  });
}
