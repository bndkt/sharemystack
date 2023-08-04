import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { NativeSyncViewProps } from "./NativeSync.types";

const NativeView: React.ComponentType<NativeSyncViewProps> =
  requireNativeViewManager("NativeSync");

export default function NativeSyncView(props: NativeSyncViewProps) {
  return <NativeView {...props} />;
}
