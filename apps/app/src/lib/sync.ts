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
      console.log("Pulling changes ...");

      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: reset ? undefined : lastPulledAt,
      });

      if (error) {
        throw new Error(error.message);
      }

      const { changes, timestamp } = data as {
        changes: SyncDatabaseChangeSet;
        timestamp: number;
      };

      console.log(`Changes pulled at ${new Date(timestamp).toISOString()} UTC`);

      return { changes, timestamp };
    },
    /* pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(
        `https://my.backend/sync?last_pulled_at=${lastPulledAt}`,
        {
          method: "POST",
          body: JSON.stringify(changes),
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
    }, */
    // migrationsEnabledAtVersion: 1,
  });
}
