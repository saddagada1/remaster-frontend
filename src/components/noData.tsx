import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

const NoData: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-1/2 w-full items-center justify-center px-4 text-center",
        className,
      )}
    >
      <p className="p-accent">{children ?? "Nothing to show here :("}</p>
    </div>
  );
};
export default NoData;
