import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type FeaturesItem = {
  icon: keyof typeof Icons;
  name: string;
  description: string;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
};

export type PricingListItem = {
  label: string;
  notInclude?: boolean;
};

export type PricingItem = {
  price: string;
  title: string;
  description?: string;
  active?: boolean;
  list: PricingListItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
  pricingOptions: PricingItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export interface DataTableExtendedProp {
  title: string;
  filterKey: "name" | "email" | "label" | "title";
  icon: keyof typeof Icons;
}
