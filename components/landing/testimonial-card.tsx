import Image from "next/image";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type TestimonialCardProps = React.HTMLAttributes<HTMLDivElement> & {
  quote: string;
  name: string;
  role?: string;
  imgSrc: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  imgSrc,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-slate-50 px-8 py-8 group rounded-md flex gap-6 items-center w-full",
        className,
      )}
    >
      <div className="relative w-fit">
        <Image
          src={imgSrc}
          alt="display images"
          width={200}
          style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
          height={200}
          className="grayscale group-hover:grayscale-0 rounded-sm"
        />
        <div className="absolute -right-5 -bottom-4 group-hover:-bottom-2 shadow-md rounded-md bg-white flex items-center justify-center w-16 h-10 transition duration-700">
          <div className="bg-slate-50 h-6 w-12 rounded-sm"></div>
        </div>
      </div>
      <div className="max-w-[28rem] space-y-4">
        <p className="text-black text-xl">{quote}</p>

        <div className="flex items-center text-black/50">
          <Icons.minus className="h-4 mr-2" />
          {name}
          <span className="underline ml-4">@{role}</span>
        </div>
      </div>
    </div>
  );
};

export { TestimonialCard };
