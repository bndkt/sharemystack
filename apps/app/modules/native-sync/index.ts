import { MigrationSyncChanges } from "@nozbe/watermelondb/Schema/migrations/getSyncChanges";
import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to NativeSync.web.ts
// and on native platforms to NativeSync.ts
import {
  ChangeEventPayload,
  NativeSyncViewProps,
} from "./src/NativeSync.types";
import NativeSyncModule from "./src/NativeSyncModule";
import NativeSyncView from "./src/NativeSyncView";

import { config } from "@/lib/config";

export async function pullSyncChanges({
  syncId,
  lastPulledAt,
  schemaVersion,
  migration,
}: {
  syncId: number;
  lastPulledAt?: number;
  schemaVersion: number;
  migration: MigrationSyncChanges;
}): Promise<void> {
  console.log("native-sync", "pullSyncChanges", {
    syncId,
    lastPulledAt,
    schemaVersion, // Not implemented yet
    migration, // Not implemented yet
  });
  NativeSyncModule.pullSyncChanges(
    config.supabaseUrl,
    config.supabaseAnonKey,
    syncId,
    lastPulledAt
  );
}

// Get the native constant value.
export const PI = NativeSyncModule.PI;

export function hello(): string {
  return NativeSyncModule.hello();
}

export async function setValueAsync(value: string) {
  return await NativeSyncModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  NativeSyncModule ?? NativeModulesProxy.NativeSync
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { NativeSyncView, NativeSyncViewProps, ChangeEventPayload };
