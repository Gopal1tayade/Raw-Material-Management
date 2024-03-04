import ReactWrapBalancer from "react-wrap-balancer";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Icons } from "../icons";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <>
      {/* <div className="absolute overflow-hidden w-[50%] h-96 rounded-full mx-auto top-40 left-0 right-0">
        <svg stroke="white" fill="transparent" viewBox="0 0 1600 480">
          <pattern
            id="small-grid"
            width="100"
            height="100"
            stroke="black"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" strokeWidth="0.2" />
          </pattern>
          <pattern
            id="big-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#small-grid)" />
          <rect
            width="100%"
            height="100%"
            strokeWidth="0.2"
            fill="url(#big-grid)"
          />
        </svg>
      </div> */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={""}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Book a free demo
          </Link>
          <h1
            className="pb-4 font-black tracking-tight text-transparent text-6xl lg:text-7xl  bg-clip-text bg-gradient-to-r from-foreground/60 via-foreground to-foreground/60"
            data-aos="fade-down"
          >
            <ReactWrapBalancer>
              Synergy Flow Navigating the Nexus of Supply Chain Dynamics
            </ReactWrapBalancer>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            SynergyFlow redefines supply chain dynamics, aiming for continuous
            excellence through a transformative and holistic approach, setting a
            revolutionary benchmark in industry evolution.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={""}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Get Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
