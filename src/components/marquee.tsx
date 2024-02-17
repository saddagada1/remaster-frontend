import { cn } from "@/lib/utils";
import React, { type HTMLAttributes } from "react";
import { useElementSize } from "usehooks-ts";

const Marquee: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const [text, { width: length }] = useElementSize();
  return (
    <section
      {...props}
      className={cn("section overflow-hidden px-0", className)}
    >
      <h1
        style={{ animationDuration: `${length * 0.001}s` }}
        ref={text}
        className="marquee font-display text-5xl font-bold uppercase lg:text-6xl 2xl:text-7xl"
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index}>
            &nbsp;
            {children}
          </span>
        ))}
      </h1>
    </section>
  );
};
export default Marquee;
