"use client";

import * as React from "react";
import Image from "next/image";
import { Icons } from "../icons";

export const Video = () => {
  return (
    <section
      id="features"
      className="container space-y-16 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-sans text-2xl leading-[1.1] sm:text-2xl md:text-5xl font-extrabold">
          We are ready to help
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          We are committed to your success. Contact us for any assistance;
          we&apos;re ready to help!
        </p>
      </div>
      <div className="mx-auto flex justify-center md:max-w-[64rem] relative">
        <div className="overflow-hidden relative">
          <img
            src="/images/video/video.jpg"
            alt="demo video image"
            className="max-w-4xl rounded-md hover:scale-105 transition duration-500"
          />
          <Icons.playCircle className="absolute w-12 h-12 text-background z-10" />
        </div>
      </div>
    </section>
  );
};
