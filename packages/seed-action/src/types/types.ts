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
  color?: string;
  website?: string;
  appStore?: string;
  affiliateLink?: string;
  categories: (keyof Categories)[];
};

export type Tools = {
  [slug: string]: Tool;
};
