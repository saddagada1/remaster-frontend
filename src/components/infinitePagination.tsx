import { useRef, type HTMLAttributes, type RefObject, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useIntersectionObserver } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface InfinitePaginationProps extends HTMLAttributes<HTMLDivElement> {
  lastItem: RefObject<Element>;
  onLastItem: () => void;
}

const InfinitePagination: React.FC<InfinitePaginationProps> = ({
  lastItem,
  onLastItem,
  className,
  children,
  ...props
}) => {
  const container = useRef<HTMLDivElement>(null!);
  const observer = useIntersectionObserver(lastItem, {
    root: container.current,
  });

  useEffect(() => {
    if (observer?.isIntersecting) {
      onLastItem();
    }
  }, [onLastItem, observer]);

  return (
    <ScrollArea
      {...props}
      dir="ltr"
      ref={container}
      className={cn("section flex-1", className)}
    >
      {children}
    </ScrollArea>
  );
};
export default InfinitePagination;
