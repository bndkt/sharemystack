import { Facebook1 } from "./Facebook1";
import { Instagram1 } from "./Instagram1";
import { LinkedIn1 } from "./LinkedIn1";
import { Twitter1 } from "./Twitter1";
import { ShareOptions } from "../ShareOptions";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export type Target = "instagram" | "facebook" | "twitter" | "linkedin";

export type Template = {
  id: string;
  component: (templateProps: TemplateProps, picks: Pick[]) => React.JSX.Element;
  target: Target;
};

export type TemplateProps = {
  profile: Profile;
  stack: Stack;
  options: ShareOptions;
  width: number;
};

export const templates: Template[] = [
  {
    id: "instagram1",
    component: (templateProps, picks) => (
      <Instagram1 {...templateProps} picks={picks} />
    ),
    target: "instagram",
  },
  {
    id: "facebook1",
    component: (templateProps, picks) => (
      <Facebook1 {...templateProps} picks={picks} />
    ),
    target: "facebook",
  },
  {
    id: "twitter1",
    component: (templateProps, picks) => (
      <Twitter1 {...templateProps} picks={picks} />
    ),
    target: "twitter",
  },
  {
    id: "linkedin1",
    component: (templateProps, picks) => (
      <LinkedIn1 {...templateProps} picks={picks} />
    ),
    target: "linkedin",
  },
];
