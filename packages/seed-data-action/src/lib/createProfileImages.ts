import { promises as fs } from "fs";
import path from "path";

import { supabase } from "./supabase.js";
import { RecordIds } from "../types/types.js";

export async function createProfileImages({
  profileRecordIds,
}: {
  profileRecordIds: RecordIds;
}) {
  const imagesPath =
    process.env.GITHUB_ACTIONS === "true"
      ? "./assets/images/profiles"
      : "../../assets/images/profiles";

  const files = await fs.readdir(imagesPath, {});

  for (const file of files) {
    console.log({ file });
    if (path.extname(file) === ".webp") {
      const filePath = path.join(imagesPath, file);

      const imageFile = await fs.readFile(filePath, "utf-8");

      const { data, error } = await supabase.storage
        .from("public-images")
        .upload(`profiles/${file}`, imageFile, {
          cacheControl: "3600",
          upsert: true,
        });

      error && console.error(error);
    }
  }

  // return toolIconRecordIds;
}
