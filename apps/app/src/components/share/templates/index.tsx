import { Facebook1 } from "./Facebook1";
import { Instagram1 } from "./Instagram1";
import { ShareOptions } from "../ShareOptions";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export type Target = "instagram" | "facebook" | "twitter" | "linkedin";

export type Template = {
  id: string;
  component: (props: TemplateProps) => React.JSX.Element;
  target: Target;
};

export type TemplateProps = {
  profile: Profile;
  stack: Stack;
  picks: Pick[];
  options: ShareOptions;
  width: number;
};

export const templates: Template[] = [
  {
    id: "t1",
    component: (props: TemplateProps) => <Instagram1 {...props} />,
    target: "instagram",
  },
  {
    id: "t2",
    component: (props: TemplateProps) => <Facebook1 {...props} />,
    target: "facebook",
  },
  {
    id: "t3",
    component: (props: TemplateProps) => <Instagram1 {...props} />,
    target: "twitter",
  },
  {
    id: "t4",
    component: (props: TemplateProps) => <Instagram1 {...props} />,
    target: "linkedin",
  },
  {
    id: "t5",
    component: (props: TemplateProps) => <Instagram1 {...props} />,
    target: "instagram",
  },
];
