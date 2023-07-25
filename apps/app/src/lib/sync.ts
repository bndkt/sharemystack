import { SyncDatabaseChangeSet, synchronize } from "@nozbe/watermelondb/sync";

import { supabase } from "./supabase";
import { database } from "./watermelon";

export async function sync(reset = false) {
  if (reset) {
    await database.write(async () => {
      await database.unsafeResetDatabase();
      console.log("✅ DB reset");
    });
  }

  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log("🍉 ⬇️ Pulling changes ...", { lastPulledAt });

      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: reset ? undefined : lastPulledAt,
      });

      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      const { changes, timestamp } = data as {
        changes: SyncDatabaseChangeSet;
        timestamp: number;
      };

      console.log(
        `🍉 Changes pulled at ${new Date(timestamp).toISOString()} UTC`
      );

      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("🍉 ⬆️ Pushing changes ...");
      console.log("CHANGES", (changes as any)?.picks.created);

      const { data, error } = await supabase.rpc("push", { changes });

      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      console.log(`🍉 Changes pushed at ${new Date().toISOString()} UTC`);
      console.log("🍉", { data });
    },
    // migrationsEnabledAtVersion: 1,
  });
}
