import { FeaturesItem } from "@/types";
import { Icons } from "../icons";

export const Features: React.FC = () => {
  const features: FeaturesItem[] = [
    {
      icon: "realTimeTracking",
      name: "Real-time Tracking",
      description:
        "Provides instant visibility into inventory levels and order statuses for informed decision-making.",
    },
    {
      icon: "roleBasedAccess",
      name: "Role-based Access",
      description:
        "Tailors access permissions to ensure secure and personalized interactions for each role.",
    },
    {
      icon: "activityManagement",
      name: "Activity Management",
      description:
        "Efficiently tracks and manages a variety of supply chain activities for optimized operations.",
    },
    {
      icon: "integratedCommunication",
      name: "Integrated Communication",
      description:
        "Enables seamless communication and collaboration among suppliers, distributors, and customers",
    },
    {
      icon: "autometedRecordKeeping",
      name: "Automated Record-keeping",
      description:
        "Automates the maintenance of comprehensive records for streamlined and error-free operations.",
    },
    {
      icon: "userFriendlyInterface",
      name: "User-friendly Interface",
      description:
        "Boasts an intuitive design, facilitating easy navigation and enhancing overall user experience.",
    },
  ];
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          Main Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          SynergyFlow optimizes supply chains, tracking, managing, and
          streamlining activities for seamless efficiency.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((item) => {
          const Icon = Icons[item.icon || "arrowRight"];

          return (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[200px] gap-4 flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 fill-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="mx-auto text-center md:max-w-[58rem]">
                        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                             another one
                        </p>
                  </div> */}
    </section>
  );
};
