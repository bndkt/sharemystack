import { Facebook1 } from "./Facebook1";
import { Instagram1 } from "./Instagram1";
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
    id: "t1",
    component: (templateProps, picks) => (
      <Instagram1 {...templateProps} picks={picks} />
    ),
    target: "instagram",
  },
  {
    id: "t2",
    component: (templateProps, picks) => (
      <Facebook1 {...templateProps} picks={picks} />
    ),
    target: "facebook",
  },
  {
    id: "t3",
    component: (templateProps, picks) => (
      <Instagram1 {...templateProps} picks={picks} />
    ),
    target: "twitter",
  },
  {
    id: "t4",
    component: (templateProps, picks) => (
      <Instagram1 {...templateProps} picks={picks} />
    ),
    target: "linkedin",
  },
  {
    id: "t5",
    component: (templateProps, picks) => (
      <Instagram1 {...templateProps} picks={picks} />
    ),
    target: "instagram",
  },
];
