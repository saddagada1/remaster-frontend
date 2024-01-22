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
  setIsPlaying,
  setPlaybackPosition,
  setPlayingLoop,
  setRepeatingLoop,
} from "@/lib/redux/slices/remasterSlice";
import { LoopIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import EditLoopModal from "./editLoopModal";

interface LoopButtonProps extends HTMLAttributes<HTMLDivElement> {
  loop: Loop;
  disabled?: boolean;
}

const LoopButton: React.FC<LoopButtonProps> = ({
  loop,
  disabled,
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
                state.seek(loop.start);
                dispatch(setPlaybackPosition(loop.start));
                if (!state.isPlaying) {
                  dispatch(setPlayingLoop(loop));
                  dispatch(setIsPlaying(true));
                } else {
                  dispatch(setIsPlaying(false));
                }
              }}
              variant="link"
              className="h-fit pl-0"
            >
              {state.isPlaying &&
              (loop.id === state.repeatingLoop?.id ||
                (!state.repeatingLoop && loop.id === state.playingLoop?.id)) ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant={
                loop.id === state.repeatingLoop?.id ? "secondary" : "link"
              }
              className="h-fit"
              onClick={() => {
                if (loop.id === state.repeatingLoop?.id) {
                  dispatch(setRepeatingLoop(null));
                } else {
                  dispatch(setRepeatingLoop(loop));
                  if (
                    state.playbackPosition >= loop.start &&
                    loop.end >= state.playbackPosition
                  ) {
                    return;
                  }
                  state.seek(loop.start);
                  dispatch(setPlaybackPosition(loop.start));
                  if (!state.isPlaying) {
                    dispatch(setPlayingLoop(loop));
                  }
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
