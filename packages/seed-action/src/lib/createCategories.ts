import { supabase } from "./supabase.js";
import { categories } from "./data.js";
import { RecordIds } from "../types/types.js";

export async function createCategories(stackTypeRecordIds: RecordIds) {
  const categoryRecordIds: RecordIds = {};

  for (const slug of Object.keys(categories)) {
    const category = categories[slug];

    const { data: categoryRecords, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug,
          name: category.name,
          icon_name: category.iconName,
          is_coming_soon: category.isComingSoon,
          updated_at: "now()",
          last_modified_at: "now()",
        },
        { onConflict: "slug" }
      )
      .select();

    if (categoryRecords) {
      for (const categoryRecord of categoryRecords) {
        categoryRecordIds[categoryRecord.slug] = categoryRecord.id;

        for (const stackTypeSlug of category.stackTypes) {
          const stackTypesSlug = `${stackTypeSlug}-${slug}`;

          if (stackTypeRecordIds[slug]) {
            const { data: stackTypeCategoryRecords, error } = await supabase
              .from("stack_type_categories")
              .upsert(
                {
                  slug: stackTypesSlug,
                  stack_type_id: stackTypeRecordIds[slug],
                  category_id: categoryRecord.id,
                  updated_at: "now()",
                  last_modified_at: "now()",
                },
                { onConflict: "slug" }
              )
              .select();
            if (error) console.error(error);
          }
        }
      }
    }
  }

  return categoryRecordIds;
}
