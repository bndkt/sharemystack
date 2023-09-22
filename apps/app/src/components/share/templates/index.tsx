import { Facebook1 } from "./Facebook1";
import { Instagram1 } from "./Instagram1";
import { LinkedIn1 } from "./LinkedIn1";
import { Twitter1 } from "./Twitter1";
import { TShareOptions } from "../ShareOptions";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export type Target = "instagram" | "facebook" | "twitter" | "linkedin";

export type Template = {
  id: string;
  component: (templateProps: TemplateProps) => React.JSX.Element;
  target: Target;
};

export type TemplateProps = {
  profile: Profile;
  stack: Stack;
  options: TShareOptions;
  width: number;
  picks: Pick[];
};

export const templates: Template[] = [
  {
    id: "instagram1",
    component: (templateProps) => <Instagram1 {...templateProps} />,
    target: "instagram",
  },
  {
    id: "facebook1",
    component: (templateProps) => <Facebook1 {...templateProps} />,
    target: "facebook",
  },
  {
    id: "twitter1",
    component: (templateProps) => <Twitter1 {...templateProps} />,
    target: "twitter",
  },
  {
    id: "linkedin1",
    component: (templateProps) => <LinkedIn1 {...templateProps} />,
    target: "linkedin",
  },
];
