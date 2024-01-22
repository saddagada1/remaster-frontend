import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Metadata, type Loop, type Tab } from "@/lib/types";

interface RemasterState {
  metadata: Metadata | null;
  seek: (position: number) => void;
  loops: Loop[];
  isPlaying: boolean;
  isScrubbing: boolean;
  volume: number;
  playbackPosition: number;
  playingLoop: Loop | null;
  repeatingLoop: Loop | null;
}

const initialState: RemasterState = {
  metadata: null,
  seek: () => {
    return;
  },
  loops: [],
  isPlaying: false,
  isScrubbing: false,
  volume: 0.0,
  playbackPosition: 0.0,
  playingLoop: null,
  repeatingLoop: null,
};

const remasterSlice = createSlice({
  name: "remaster",
  initialState,
  reducers: {
    initRemaster(
      state,
      action: PayloadAction<{
        seek: (position: number) => void;
        metadata: Metadata;
      }>,
    ) {
      (state.seek = action.payload.seek),
        (state.metadata = action.payload.metadata);
    },
    setLoops(state, action: PayloadAction<Loop[]>) {
      state.loops = action.payload;
    },
    setPlaybackPosition(state, action: PayloadAction<number>) {
      state.playbackPosition = action.payload;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setIsScrubbing(state, action: PayloadAction<boolean>) {
      state.isScrubbing = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setPlayingLoop(state, action: PayloadAction<Loop | null>) {
      state.playingLoop = action.payload;
    },
    setRepeatingLoop(state, action: PayloadAction<Loop | null>) {
      state.repeatingLoop = action.payload;
    },
    resizeLoop(
      state,
      action: PayloadAction<{ index: number; width: number; snapTo: number }>,
    ) {
      state.loops = state.loops.map((lp, i) => {
        if (i === action.payload.index) {
          lp.end = lp.end + action.payload.width / action.payload.snapTo;
        } else if (i > action.payload.index) {
          lp.start = lp.start + action.payload.width / action.payload.snapTo;
          lp.end = lp.end + action.payload.width / action.payload.snapTo;
        }
        return lp;
      });
    },
    createLoop(state, action: PayloadAction<{ key: number; mode: number }>) {
      if (!state.metadata) return;
      let lastLoopEnd: number;
      let newLoopEnd: number;
      if (state.loops.length === 0) {
        lastLoopEnd = 0;
      } else {
        lastLoopEnd = state.loops[state.loops.length - 1]!.end;
      }
      if (lastLoopEnd + 10 > state.metadata.duration) {
        newLoopEnd = state.metadata.duration;
      } else {
        newLoopEnd = lastLoopEnd + 10;
      }
      const loop: Loop = {
        id: state.loops.length + 1,
        start: lastLoopEnd,
        end: newLoopEnd,
        key: action.payload.key,
        mode: action.payload.mode,
        composition: "",
      };

      if (
        loop.start <= state.playbackPosition &&
        state.playbackPosition <= loop.end
      ) {
        state.playingLoop = loop;
      }
      state.loops = [...state.loops, loop];
    },
    handlePlayingLoop(
      state,
      action: PayloadAction<{ position: number; refresh?: boolean }>,
    ) {
      if (
        !action.payload.refresh &&
        state.playingLoop &&
        state.playingLoop.start <= action.payload.position &&
        action.payload.position <= state.playingLoop.end
      ) {
        return;
      }

      if (
        !action.payload.refresh &&
        state.repeatingLoop &&
        (state.repeatingLoop.start > action.payload.position ||
          action.payload.position > state.repeatingLoop.end)
      ) {
        state.seek(state.repeatingLoop.start * 1000);
        state.playbackPosition = state.repeatingLoop.start;
        return;
      }

      state.playingLoop = null;
      const next = state.loops.find(
        (loop) =>
          loop.start <= action.payload.position &&
          action.payload.position <= loop.end,
      );
      if (next) {
        state.playingLoop = next;
      }

      if (action.payload.refresh && state.repeatingLoop !== null) {
        const update = state.loops.find(
          (loop) => loop.id === state.repeatingLoop!.id,
        );
        if (!update) return;
        state.repeatingLoop = update;
      }
    },
    updateLoop(state, action: PayloadAction<Loop>) {
      state.loops = state.loops.map((loop) => {
        if (loop.id === action.payload.id) {
          if (state.repeatingLoop) {
            if (state.repeatingLoop.id === loop.id) {
              state.repeatingLoop = action.payload;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === loop.id) {
              state.playingLoop = action.payload;
            }
          }
          return action.payload;
        }

        return loop;
      });
    },
    deleteLoop(state, action: PayloadAction<Loop>) {
      state.repeatingLoop = null;
      state.playingLoop = null;
      const filteredLoops = state.loops.filter(
        (loop) => action.payload.id !== loop.id,
      );
      state.loops = filteredLoops.map((loop, index) => {
        if (loop.id === action.payload.id + 1) {
          const updatedLoop = {
            id: action.payload.id,
            key: loop.key,
            mode: loop.mode,
            composition: loop.composition,
            start: action.payload.id === 1 ? 0 : filteredLoops[index - 1]!.end,
            end: loop.end,
          };
          if (state.repeatingLoop) {
            if (state.repeatingLoop.id === action.payload.id) {
              state.repeatingLoop = updatedLoop;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === action.payload.id) {
              state.playingLoop = updatedLoop;
            }
          }
          return updatedLoop;
        } else if (loop.id > action.payload.id + 1) {
          return {
            ...loop,
            id: loop.id - 1,
          };
        }

        return loop;
      });
    },
    updateTuning(state, action: PayloadAction<{ tuning: string[] }>) {
      const update = state.loops.map((loop) => {
        const tabs = JSON.parse(loop.composition) as Tab[];
        return {
          ...loop,
          composition: JSON.stringify(
            tabs.map((tab) => ({
              ...tab,
              head: action.payload.tuning.map((note) =>
                note.length > 1 ? `${note}|` : `${note} |`,
              ),
            })),
          ),
        };
      });
      if (state.playingLoop) {
        const playingUpdate = update.find(
          (loop) => loop.id === state.playingLoop?.id,
        );
        if (!playingUpdate) return;
        state.playingLoop = playingUpdate;
      }
      state.loops = update;
    },
  },
});

export const {
  initRemaster,
  setLoops,
  setPlaybackPosition,
  setIsPlaying,
  setIsScrubbing,
  setVolume,
  setPlayingLoop,
  setRepeatingLoop,
  resizeLoop,
  createLoop,
  handlePlayingLoop,
  updateLoop,
  deleteLoop,
  updateTuning,
} = remasterSlice.actions;

export default remasterSlice.reducer;
