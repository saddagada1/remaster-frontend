import { useRef, type HTMLAttributes, type RefObject, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useIntersectionObserver } from "usehooks-ts";
import { SimpleLoading } from "./loading";

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
      {loading && <SimpleLoading />}
    </ScrollArea>
  );
};
export default InfinitePagination;
