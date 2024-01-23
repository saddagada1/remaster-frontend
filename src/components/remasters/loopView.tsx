import { useAppSelector } from "@/lib/redux/hooks";
import CreateLoopModal from "./createLoopModal";
import { ScrollArea } from "../ui/scroll-area";
import { Accordion } from "../ui/accordion";
import LoopButton from "./loopButton";
import NoData from "../noData";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useElementSize } from "usehooks-ts";

interface LoopViewProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  seek: (position: number) => void;
}

const LoopView: React.FC<LoopViewProps> = ({
  disabled,
  seek,
  className,
  ...props
}) => {
  const state = useAppSelector((store) => store.remaster);
  const [container, { height }] = useElementSize();

  return (
    <div {...props} className={cn("section flex flex-col gap-2", className)}>
      <div className="flex justify-between">
        <h1 className="label">Loops</h1>
        {!disabled && <CreateLoopModal />}
      </div>
      <div ref={container} className="h-full">
        {state.loops.length > 0 ? (
          <ScrollArea>
            <Accordion
              style={{ maxHeight: height }}
              type="multiple"
              className="flex flex-col gap-2"
            >
              {state.loops.map((loop) => (
                <LoopButton key={loop.id} loop={loop} seek={seek} />
              ))}
            </Accordion>
          </ScrollArea>
        ) : (
          <NoData>
            {disabled ? "No loops :(" : "Create a loop to begin!"}
          </NoData>
        )}
      </div>
    </div>
  );
};
export default LoopView;
