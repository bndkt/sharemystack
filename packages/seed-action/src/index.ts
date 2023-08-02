import * as core from "@actions/core";

import { createStackTypes } from "./lib/createStackTypes.js";
import { createCategories } from "./lib/createCategories.js";
import { createTools } from "./lib/createTools.js";

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput("milliseconds");

    createStackTypes();
    createCategories();
    createTools();

    core.debug(new Date().toTimeString());
    // await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
