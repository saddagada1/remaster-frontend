import { useElementSize } from "usehooks-ts";
import Gradient from "./gradient";
import { pitchClassColours } from "@/lib/constants";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

interface OrbProps extends HTMLAttributes<HTMLDivElement> {
  orientation: "side" | "top";
  grain?: boolean;
}

const Orb: React.FC<OrbProps> = ({
  orientation,
  grain,
  className,
  ...props
}) => {
  const [gradientContainer, { width, height }] = useElementSize();
  const router = useRouter();
  return (
    <div
      {...props}
      onClick={() => void router.push("/")}
      className={cn(
        "section flex cursor-pointer items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        ref={gradientContainer}
        style={{
          height: orientation === "side" ? width : "100%",
          width: orientation === "top" ? height : "100%",
        }}
        className="relative flex items-center justify-center overflow-hidden rounded-[50%]"
      >
        <Gradient colours={Object.values(pitchClassColours)} animated />
        {grain && <div className="anim-grain opacity-10 mix-blend-overlay" />}
      </div>
    </div>
  );
};
export default Orb;
