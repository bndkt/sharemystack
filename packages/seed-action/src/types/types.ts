export type StackType = {
  name: string;
  iconName: string;
  isComingSoon: boolean;
};

export type StackTypes = {
  [slug: string]: StackType;
};

export type Category = {
  name: string;
  iconName: string;
  isComingSoon: boolean;
  stackTypes: (keyof StackTypes)[];
};

export type Categories = {
  [slug: string]: Category;
};

export type Tool = {
  name: string;
  color: string | null;
  website: string | null;
  appStore: string | null;
  affiliateLink?: string;
  categories: (keyof Categories)[];
};

export type Tools = {
  [slug: string]: Tool;
};

export type Profile = {
  name: string;
  description: string;
  image: string | null;
  website: string;
  twitter: string;
  twitter_image_url: string;
  youtube: string;
  is_featured: boolean;
  stacks?: {
    stackType: keyof StackTypes;
    picks: { category: keyof Categories; tool: keyof Tools }[];
  }[];
};

export type Profiles = {
  [slug: string]: Profile;
};

export type RecordIds = { [slug: string]: string };
