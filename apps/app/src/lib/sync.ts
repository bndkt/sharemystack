import { SyncDatabaseChangeSet, synchronize } from "@nozbe/watermelondb/sync";
// import SyncLogger from "@nozbe/watermelondb/sync/SyncLogger";
// const logger = new SyncLogger(10 /* limit of sync logs to keep in memory */);

import { supabase } from "./supabase";
import { database } from "./watermelon";
// import { pullSyncChanges } from "native-sync";

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
        last_pulled_at: reset || !lastPulledAt ? undefined : lastPulledAt,
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

      const { error } = await supabase.rpc("push", { changes });

      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      console.log(`🍉 Changes pushed at ${new Date().toISOString()} UTC`);
    },
    // migrationsEnabledAtVersion: 1,
    // log: logger.newLog(),
    sendCreatedAsUpdated: true,
  });
}

// Native Sync (https://watermelondb.dev/docs/Sync/Frontend#advanced-adopting-turbo-login)
export async function nativeSync(reset = false) {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const syncId = Math.floor(Math.random() * 1000000000);

      /* await pullSyncChanges(
        // Pass the id
        {
          syncId,
          // Pass whatever information your plugin needs to make the request
          lastPulledAt: reset || !lastPulledAt ? undefined : lastPulledAt,
          schemaVersion,
          migration,
        }
      ); */

      return { syncJsonId: syncId };
    },
    unsafeTurbo: reset,
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("🍉 ⬆️ Pushing changes ...");

      const { error } = await supabase.rpc("push", { changes });

      if (error) {
        throw new Error("🍉".concat(error.message));
      }

      console.log(`🍉 Changes pushed at ${new Date().toISOString()} UTC`);
    },
    // migrationsEnabledAtVersion: 1,
    // log: logger.newLog(),
    sendCreatedAsUpdated: true,
  });
}
