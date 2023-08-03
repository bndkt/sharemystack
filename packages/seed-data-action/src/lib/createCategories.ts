import { supabase } from "./supabase.js";
import { categories } from "./data.js";
import { RecordIds } from "../types/types.js";

export async function createCategories({
  stackTypeRecordIds,
}: {
  stackTypeRecordIds: RecordIds;
}) {
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

    if (error) console.error(error);

    if (categoryRecords) {
      const categoryRecord = categoryRecords[0];
      categoryRecordIds[categoryRecord.slug] = categoryRecord.id;

      for (const stackTypeSlug of category.stackTypes) {
        const stackTypeCategorySlug = `${stackTypeSlug}-${slug}`;

        if (stackTypeRecordIds[stackTypeSlug]) {
          await supabase
            .from("stack_type_categories")
            .upsert(
              {
                slug: stackTypeCategorySlug,
                stack_type_id: stackTypeRecordIds[stackTypeSlug],
                category_id: categoryRecord.id,
                updated_at: "now()",
                last_modified_at: "now()",
              },
              { onConflict: "slug" }
            )
            .select();
        }
      }
    }
  }

  return categoryRecordIds;
}
