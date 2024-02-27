import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Video } from "@/components/landing/video";
import { Pricing } from "@/components/landing/pricing";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Video />
      <Pricing />
      <Testimonials />
    </>
  );
}
