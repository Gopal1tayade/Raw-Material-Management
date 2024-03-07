import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
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
      title: "Colors",
      href: "/dashboard/colors",
      icon: "palette",
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: "task",
    },
    {
      title: "Processes",
      href: "/dashboard/processes",
      icon: "process",
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: "wallet",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
