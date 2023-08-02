import { promises as fs } from "fs";
import path from "path";
import { supabase } from "./supabase.js";

export async function createToolIcons() {
  const iconsPath = "../../assets/icons";

  const files = await fs.readdir(iconsPath, {});

  const toolIconRecordIds: { [slug: string]: string } = {};

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const filePath = path.join(iconsPath, file);
      const svgContent = await fs.readFile(filePath, "utf-8");

      const slug = path.basename(file, ".svg");

      const { data: categoryRecords, error } = await supabase
        .from("tool_icons")
        .upsert(
          {
            slug,
            icon_svg: svgContent,
            updated_at: "now()",
            last_modified_at: "now()",
          },
          { onConflict: "slug" }
        )
        .select();

      if (categoryRecords) {
        for (const categoryRecord of categoryRecords) {
          toolIconRecordIds[categoryRecord.slug] = categoryRecord.id;
        }
      }
    }
  }

  return toolIconRecordIds;
}
