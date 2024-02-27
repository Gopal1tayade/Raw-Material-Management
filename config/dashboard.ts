import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "overview",
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: "product",
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: "task",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
