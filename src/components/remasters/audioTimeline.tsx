import { useEffect, useState } from "react";
import { useEffectOnce, useWindowSize } from "usehooks-ts";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";
import { clamp, getVideoTimestamp } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  handlePlayingLoop,
  setIsPlaying,
  setPlaybackPosition,
} from "@/lib/redux/slices/remasterSlice";

interface AudioTimelineProps {
  width: number;
  duration: number;
}

const AudioTimeline: React.FC<AudioTimelineProps> = ({ width, duration }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((store) => store.remaster);
  const [volume, setVolume] = useState(0.5);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const { width: windowWidth } = useWindowSize();

  const handleClickToSeek = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isScrubbing) return;
    const seekPercentage =
      clamp(e.clientX - (windowWidth - width), 0, width) / width;
    const seekPosition = duration * seekPercentage;
    dispatch(setPlaybackPosition(seekPosition));
    state.seek(seekPosition);
    dispatch(handlePlayingLoop({ position: seekPosition }));
  };

  const togglePlay = () => {
    dispatch(setIsPlaying(state.isPlaying ? false : true));
  };

  useEffectOnce(() => {
    const savedVolume = sessionStorage.getItem("volume");
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  });

  useEffect(() => {
    const handleMouseScrub = (e: MouseEvent) => {
      if (!isScrubbing) return;
      const seekPercentage =
        clamp(e.clientX - (windowWidth - width), 0, width) / width;
      const seekPosition = duration * seekPercentage;
      dispatch(setPlaybackPosition(seekPosition));
    };

    const handleTouchScrub = (e: TouchEvent) => {
      if (!isScrubbing || !e.touches[0]) return;
      const seekPercentage =
        clamp(e.touches[0].clientX - (windowWidth - width), 0, width) / width;
      const seekPosition = duration * seekPercentage;
      dispatch(setPlaybackPosition(seekPosition));
    };

    const handleFinishScrub = () => {
      if (!isScrubbing) return;
      state.seek(state.playbackPosition);
      dispatch(handlePlayingLoop({ position: state.playbackPosition }));
      setIsScrubbing(false);
    };

    window.addEventListener("mousemove", handleMouseScrub);
    window.addEventListener("touchmove", handleTouchScrub);
    window.addEventListener("mouseup", handleFinishScrub);
    window.addEventListener("touchend", handleFinishScrub);

    return () => {
      window.removeEventListener("mousemove", handleMouseScrub);
      window.removeEventListener("touchmove", handleTouchScrub);
      window.removeEventListener("mouseup", handleFinishScrub);
      window.removeEventListener("touchend", handleFinishScrub);
    };
  }, [duration, isScrubbing, width]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const playbackPosition = Math.max(state.playbackPosition - 5, 0);
        dispatch(setPlaybackPosition(playbackPosition));
        state.seek(playbackPosition);
        dispatch(handlePlayingLoop({ position: playbackPosition }));
      }
      if (e.key === "ArrowRight") {
        const playbackPosition = Math.min(state.playbackPosition + 5, duration);
        dispatch(setPlaybackPosition(playbackPosition));
        state.seek(playbackPosition);
        dispatch(handlePlayingLoop({ position: playbackPosition }));
      }
      if (e.key === "Space") {
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [duration]);

  return (
    <>
      <div
        onClick={(e) => handleClickToSeek(e)}
        onMouseDown={() => setIsScrubbing(true)}
        onTouchStart={() => setIsScrubbing(true)}
        className="relative flex h-1.5 cursor-pointer items-center rounded border bg-accent"
      >
        <div className="h-full w-full overflow-hidden">
          <div
            style={{
              transform: `translateX(-${
                100 - (state.playbackPosition / duration) * 100
              }%)`,
            }}
            className="h-full bg-foreground"
          />
        </div>
        <div
          style={{
            right: `${100 - (state.playbackPosition / duration) * 100}%`,
          }}
          className="absolute h-4 w-4 translate-x-1/2 rounded-full bg-foreground"
        />
      </div>
      <div className="flex">
        <div className="flex flex-1 items-center gap-2">
          <Button
            onClick={() => {
              void togglePlay();
            }}
            variant="outline"
            autoFocus
          >
            {state.isPlaying ? "Pause" : "Play"}
          </Button>
          <p className="p">{`${getVideoTimestamp(
            Math.round(state.playbackPosition),
          )} / ${getVideoTimestamp(Math.round(duration))}`}</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="mono">
              Volume
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Slider
              onValueChange={(value) => {
                if (value[0]) {
                  //   void context.player?.setVolume(value[0]);
                  setVolume(value[0]);
                  sessionStorage.setItem("volume", value[0].toString());
                }
              }}
              defaultValue={[volume]}
              max={1}
              step={0.01}
              orientation="vertical"
              className="h-[100px]"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default AudioTimeline;
