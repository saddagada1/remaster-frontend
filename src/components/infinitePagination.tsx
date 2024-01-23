import { useRef, type HTMLAttributes, type RefObject, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useIntersectionObserver } from "usehooks-ts";
import { ReloadIcon } from "@radix-ui/react-icons";

interface InfinitePaginationProps extends HTMLAttributes<HTMLDivElement> {
  lastItem: RefObject<Element>;
  onLastItem: () => void;
  loading: boolean;
}

const InfinitePagination: React.FC<InfinitePaginationProps> = ({
  lastItem,
  onLastItem,
  loading,
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
    <ScrollArea {...props} dir="ltr" ref={container}>
      {children}
      {loading && (
        <p className="p my-8 flex w-full items-center justify-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </p>
      )}
    </ScrollArea>
  );
};
export default InfinitePagination;
