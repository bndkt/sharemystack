import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { encode } from "blurhash";

import { supabase } from "./supabase.js";
import { RecordIds } from "../types/types.js";

export async function createAvatarImages({
  profileRecordIds,
}: {
  profileRecordIds: RecordIds;
}) {
  const imagesPath =
    process.env.GITHUB_ACTIONS === "true"
      ? "./assets/images/avatars"
      : "../../assets/images/avatars";

  const files = await fs.readdir(imagesPath, {});

  const imageFileExtensions = [".webp", ".jpg", ".jpeg", ".png"];

  for (const file of files) {
    if (imageFileExtensions.includes(path.extname(file))) {
      const filePath = path.join(imagesPath, file);

      const slug = path.basename(file, path.extname(file));
      const avatar_image = `${slug}.webp`;

      const sharpImage = sharp(filePath);

      const webpImage = sharpImage.resize(400).webp();

      webpImage.toBuffer(async (err, data, info) => {
        const { error } = await supabase.storage
          .from("public-images")
          .upload(`avatars/${avatar_image}`, data, {
            contentType: "image/webp",
            cacheControl: "3600",
            upsert: true,
          });
        (error || err) && console.error(error, err);

        const avatar_blurhash = encode(
          new Uint8ClampedArray(
            await sharpImage.raw().ensureAlpha().toBuffer()
          ),
          info.width,
          info.height,
          4,
          4
        );

        if (avatar_blurhash && profileRecordIds[slug]) {
          await supabase
            .from("profiles")
            .update({ avatar_image, avatar_blurhash })
            .match({ id: profileRecordIds[slug] });
        }
      });
    }
  }
}
