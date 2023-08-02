import _stackTypes from "../data/stackTypes.json" assert { type: "json" };
import _categories from "../data/categories.json" assert { type: "json" };
import _tools from "../data/tools.json" assert { type: "json" };
import _profiles from "../data/profiles.json" assert { type: "json" };
import { Categories, StackTypes, Tools, Profiles } from "../types/types.js";

const stackTypes = _stackTypes as StackTypes;
const categories = _categories as Categories;
const tools = _tools as Tools;
const profiles = _profiles as Profiles;

export { stackTypes, categories, tools, profiles };
