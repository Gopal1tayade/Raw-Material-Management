import { MarketingConfig } from "@/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Service",
      href: "/sercice",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Support",
      href: "/support",
    },
  ],
  pricingOptions: [
    {
      title: "Lite",
      price: "20",
      list: [
        {
          label: "Basic community forum access",
        },
        {
          label: "Limited storage space",
        },
        {
          label: "Standard support",
        },
        {
          label: "Essential communication tools",
        },
        {
          label: "Customization options",
          notInclude: true,
        },
        {
          label: "API access for integration",
          notInclude: true,
        },
      ],
    },
    {
      title: "Basic",
      price: "50",
      active: true,
      list: [
        {
          label: "Basic community forum access",
        },
        {
          label: "Limited storage space",
        },
        {
          label: "Standard support",
        },
        {
          label: "Essential communication tools",
        },
        {
          label: "Customization options",
          notInclude: true,
        },
        {
          label: "API access for integration",
          notInclude: true,
        },
      ],
    },
    {
      title: "Plus",
      price: "99",
      list: [
        {
          label: "Basic community forum access",
        },
        {
          label: "Limited storage space",
        },
        {
          label: "Standard support",
        },
        {
          label: "Essential communication tools",
        },
        {
          label: "Customization options",
          notInclude: true,
        },
        {
          label: "API access for integration",
          notInclude: true,
        },
      ],
    },
  ],
};
