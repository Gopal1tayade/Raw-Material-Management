import { cn } from "@/lib/utils";

type ContactProps = React.HTMLAttributes<HTMLDivElement>;

const Contact: React.FC<ContactProps> = ({ className, ...props }) => {
  return <section className={cn("container bg-slate-50", className)}></section>;
};

export { Contact };
