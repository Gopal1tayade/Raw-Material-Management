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
      title: "Colors",
      href: "/dashboard/colors",
      icon: "palette",
    },
    {
      title: "Units",
      href: "/dashboard/units",
      icon: "ruler",
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
