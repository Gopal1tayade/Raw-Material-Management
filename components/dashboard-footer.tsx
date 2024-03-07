import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type DashboardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DashboardFooter: React.FC<DashboardFooterProps> = ({
  className,
  ...props
}) => {
  return (
    <footer className={cn(className)} {...props}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Theam 8
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { DashboardFooter };
