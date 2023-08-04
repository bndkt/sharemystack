import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to NativeSync.web.ts
// and on native platforms to NativeSync.ts
import NativeSyncModule from './src/NativeSyncModule';
import NativeSyncView from './src/NativeSyncView';
import { ChangeEventPayload, NativeSyncViewProps } from './src/NativeSync.types';

// Get the native constant value.
export const PI = NativeSyncModule.PI;

export function hello(): string {
  return NativeSyncModule.hello();
}

export async function setValueAsync(value: string) {
  return await NativeSyncModule.setValueAsync(value);
}

const emitter = new EventEmitter(NativeSyncModule ?? NativeModulesProxy.NativeSync);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { NativeSyncView, NativeSyncViewProps, ChangeEventPayload };
