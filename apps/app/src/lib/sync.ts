import { SyncDatabaseChangeSet, synchronize } from "@nozbe/watermelondb/sync";
// import SyncLogger from "@nozbe/watermelondb/sync/SyncLogger";
// const logger = new SyncLogger(10 /* limit of sync logs to keep in memory */);
// import { pullSyncChanges } from "native-sync";

import { supabase } from "./supabase";
import { database } from "./watermelon";

export async function sync({
  reset,
}: {
  reset?: boolean;
} = {}) {
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

      lastPulledAt = reset ?? !lastPulledAt ? undefined : lastPulledAt;

      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: lastPulledAt,
      });
      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      const { changes, timestamp } = data as {
        changes: SyncDatabaseChangeSet;
        timestamp: number;
      };

      console.log(
        `🍉 Changes pulled at ${new Date(timestamp).toISOString()} UTC`,
      );

      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("🍉 ⬆️ Pushing changes ...");

      const { error } = await supabase.rpc("push", { changes });

      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      console.log(`🍉 Changes pushed at ${new Date().toISOString()} UTC`);
    },
    unsafeTurbo: false,
    // migrationsEnabledAtVersion: 1,
    // log: logger.newLog(),
    sendCreatedAsUpdated: true,
  });
}
