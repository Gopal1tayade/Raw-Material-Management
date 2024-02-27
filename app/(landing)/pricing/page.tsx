import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-semibold">
          Simple and Affordable Pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Transparent pricing tailored to your needs. Explore affordable plans
          for everyone.
        </p>
      </div>

      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the Basic plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Basic community forum
              access
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Limited storage space
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Standard support
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Essential communication
              tools
            </li>
            <li className="flex items-center">
              <Icons.close className="mr-2 h-4 w-4 text-destructive" />{" "}
              Customization options
            </li>
            <li className="flex items-center">
              <Icons.close className="mr-2 h-4 w-4 text-destructive" /> API
              access for integration
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">₹1.5K</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>

      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the PRO plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Advanced forum
              capabilities
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Large storage allocation
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Priority support with
              live chat
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Advanced analytics and
              reporting
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4 text-green-400" />{" "}
              Customization options
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4 text-green-400" /> API access
              for integration
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">₹3K</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          {siteConfig.name} is in demo mode.{" "}
          <strong>
            You can still test the upgrade and won&apos;t be charged.
          </strong>
        </p>
      </div>
    </section>
  );
}
