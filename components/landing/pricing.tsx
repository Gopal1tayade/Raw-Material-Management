import { PricingCard } from "@/components/landing/pricing-card";
import { marketingConfig } from "@/config/marketing";

type PricingProps = React.HTMLAttributes<HTMLDivElement>;

const Pricing: React.FC<PricingProps> = ({ className, ...props }) => {
  return (
    <>
      <div className="container flex flex-col items-center space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Simple and Affordable Pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Transparent pricing tailored to your needs. Explore affordable plans
            for everyone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full mt-8 ">
          {marketingConfig.pricingOptions.map((card) => (
            <PricingCard key={card.title} item={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Pricing };
