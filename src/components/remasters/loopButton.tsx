import { type HTMLAttributes } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { type Loop } from "@/lib/types";
import {
  colourMod,
  mode,
  pitchClass,
  pitchClassColours,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setPlaybackPosition,
  setPlayingLoop,
  setRepeatingLoop,
} from "@/lib/redux/slices/remasterSlice";
import { LoopIcon, ResetIcon } from "@radix-ui/react-icons";
import EditLoopModal from "./editLoopModal";

interface LoopButtonProps extends HTMLAttributes<HTMLDivElement> {
  loop: Loop;
  disabled?: boolean;
  seek: (position: number) => void;
}

const LoopButton: React.FC<LoopButtonProps> = ({
  loop,
  disabled,
  seek,
  className,
  style,
  ...props
}) => {
  const state = useAppSelector((store) => store.remaster);
  const dispatch = useAppDispatch();
  return (
    <AccordionItem
      {...props}
      style={{
        backgroundColor: pitchClassColours[loop.key] + colourMod,
        ...style,
      }}
      className={cn("section", className)}
      value={loop.id.toString()}
    >
      <AccordionTrigger className="h-6">{`${pitchClass[loop.key]} ${
        mode[loop.mode]
      }`}</AccordionTrigger>
      <AccordionContent className="pb-0">
        <div className="flex items-center">
          <div className="flex flex-1 gap-2">
            <Button
              onClick={() => {
                seek(loop.start);
                dispatch(setPlaybackPosition(loop.start));
                dispatch(setPlayingLoop(loop));
              }}
              variant="link"
              className="h-fit pl-0"
            >
              <ResetIcon className="h-5 w-5" />
            </Button>
            <Button
              variant={
                loop.id === state.playingLoop?.id && state.repeatPlayingLoop
                  ? "secondary"
                  : "link"
              }
              className="h-fit"
              onClick={() => {
                if (
                  loop.id === state.playingLoop?.id &&
                  state.repeatPlayingLoop
                ) {
                  dispatch(setRepeatingLoop(false));
                } else {
                  dispatch(setRepeatingLoop(true));
                  if (
                    state.playbackPosition >= loop.start &&
                    loop.end >= state.playbackPosition
                  ) {
                    return;
                  }
                  seek(loop.start);
                  dispatch(setPlaybackPosition(loop.start));
                  dispatch(setPlayingLoop(loop));
                }
              }}
            >
              <LoopIcon className="h-5 w-5" />
            </Button>
          </div>
          {!state.isPlaying && !disabled && (
            <EditLoopModal loop={loop} className="pr-0" />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LoopButton;
