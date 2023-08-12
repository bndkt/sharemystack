import * as React from "react";

import { NativeSyncViewProps } from "./NativeSync.types";

export default function NativeSyncView(props: NativeSyncViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
