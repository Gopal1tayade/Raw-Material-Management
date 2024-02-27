import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className="relative bg-slate-50 z-10">
      <div className="container pt-12">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 max-w-[360px] lg:mb-16">
              <Link href="/" className="mb-8 inline-flex">
                <Icons.logo className="mr-2" />
                {siteConfig.name}
              </Link>
              <p className="mb-9 text-base font-medium leading-relaxed text-body-color">
                Navigating the Nexus of Supply Chain Dynamics
              </p>
              <div className="flex items-center">
                <a
                  href="/"
                  aria-label="social-link"
                  className="mr-6 text-[#CED3F6] hover:text-primary"
                >
                  <Icons.facebook />
                </a>
                <a
                  href="/"
                  aria-label="social-link"
                  className="mr-6 text-[#CED3F6] hover:text-primary"
                >
                  <Icons.youtube />
                </a>
                <a
                  href="/"
                  aria-label="social-link"
                  className="mr-6 text-[#CED3F6] hover:text-primary"
                >
                  <Icons.linkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Useful Links
              </h2>
              <ul>
                <li>
                  <a
                    href="/services"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Support{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Terms & Conditions
              </h2>
              <ul>
                <li>
                  <a
                    href="/terms"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Terms and Conditions{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Refund Policy{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Support & Help
              </h2>
              <ul>
                <li>
                  <a
                    href="/contact"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Open Support Form{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    Terms of Use{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
