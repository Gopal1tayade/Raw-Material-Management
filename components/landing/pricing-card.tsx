import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { PricingItem } from "@/types";

type PricingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PricingItem;
};

type ListItemProps = React.HTMLAttributes<HTMLDivElement> & {
  notInclude?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({
  notInclude = false,
  children,
  className,
  ...props
}) => {
  return (
    <li className="flex items-center">
      {notInclude ? (
        <Icons.close className="w-5 h-5 text-red-400" />
      ) : (
        <Icons.check className="w-5 h-5 text-green-400" />
      )}
      <span className="ml-2 font-medium text-base leading-9">{children}</span>
    </li>
  );
};

const PricingCard: React.FC<PricingCardProps> = ({
  item,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex max-w-96 flex-col flex-grow mt-8 overflow-hidden transform bg-background rounded-lg shadow-lg",
        item.active && "z-10 md:scale-110",
      )}
      {...props}
    >
      <div className="flex flex-col gap-2 items-center p-10 bg-slate-50">
        <span className="font-semibold text-lg">{item.title}</span>
        <div className="flex items-center">
          <span className="text-3xl">₹</span>
          <span className="text-6xl font-bold">{item.price}</span>
          <span className="text-2xl text-gray-500">/mo</span>
        </div>
      </div>

      <div className="p-10">
        <ul>
          {item.list.map((listItem) => (
            <ListItem key={listItem.label} notInclude={listItem.notInclude}>
              {listItem.label}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="flex w-full justify-center px-10 pb-10">
        <Button
          variant={item.active ? "default" : "outline"}
          size="lg"
          className="w-full"
        >
          Join now
        </Button>
      </div>
    </div>
  );
};

export { PricingCard };
