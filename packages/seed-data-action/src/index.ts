import "dotenv/config";
import * as core from "@actions/core";

import { createStackTypes } from "./lib/createStackTypes.js";
import { createCategories } from "./lib/createCategories.js";
import { createTools } from "./lib/createTools.js";
import { createToolIcons } from "./lib/createToolIcons.js";
import { createProfiles } from "./lib/createProfiles.js";

async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput("milliseconds");

    const toolIconRecordIds = await createToolIcons();
    const stackTypeRecordIds = await createStackTypes();
    const categoryRecordIds = await createCategories({ stackTypeRecordIds });
    const toolRecordIds = await createTools({
      toolIconRecordIds,
      categoryRecordIds,
    });
    console.log({ toolRecordIds });
    const profileRecordIds = await createProfiles({
      stackTypeRecordIds,
      toolRecordIds,
      categoryRecordIds,
    });

    // core.debug(new Date().toTimeString());
    // await wait(parseInt(ms, 10));
    // core.debug(new Date().toTimeString());
    // core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
