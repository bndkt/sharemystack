import { vexo } from "vexo-analytics";

if (!__DEV__) {
  vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY as string);
}
