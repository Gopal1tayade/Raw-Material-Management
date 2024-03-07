"use client";

import { TestimonialCard } from "@/components/landing/testimonial-card";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
      name: "Gopal Tayade",
      role: "CEO at Airbnb",
      imgSrc: "/images/gopal.jpeg",
    },
    {
      quote:
        "Exceptional platform! It's user-friendly, visually appealing, and keeps our community engaged seamlessly. Highly recommended!",
      name: "Yash Bansod",
      role: "Founder of BetterDev",
      imgSrc: "/images/yash.jpeg",
    },
    {
      quote:
        "The clean design fosters a distraction-free environment, making our community interactions smooth and enjoyable. A game-changer!",
      name: "Aachal Chede",
      role: "Ceo at Sugar Cosmetics",
      imgSrc: "/images/aachal.jpeg",
    },
  ];

  return (
    <section
      id="features"
      className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          What Our Users Says
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          There are many variations of passages of Lorem Ipsum available but the
          majority have suffered alteration in some form.
        </p>
      </div>
      <div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="space-x-4">
            {testimonials.map((item) => (
              <CarouselItem className="basis-2/3" key={item.name}>
                <TestimonialCard
                  quote={item.quote}
                  name={item.name}
                  imgSrc={item.imgSrc}
                  role={item.role}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
