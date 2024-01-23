import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Metadata, type Loop } from "@/lib/types";

interface RemasterState {
  metadata: Metadata | null;
  loops: Loop[];
  isPlaying: boolean;
  isScrubbing: boolean;
  volume: number;
  playbackPosition: number;
  playingLoop: Loop | null;
  repeatPlayingLoop: boolean;
}

const initialState: RemasterState = {
  metadata: null,
  loops: [],
  isPlaying: false,
  isScrubbing: false,
  volume: 0.0,
  playbackPosition: 0.0,
  playingLoop: null,
  repeatPlayingLoop: false,
};

const remasterSlice = createSlice({
  name: "remaster",
  initialState,
  reducers: {
    initMetadata(state, action: PayloadAction<Metadata>) {
      state.metadata = action.payload;
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
    setRepeatingLoop(state, action: PayloadAction<boolean>) {
      state.repeatPlayingLoop = action.payload;
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
        if (state.playingLoop?.id === lp.id) {
          state.playingLoop = lp;
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
    handlePlayingLoop(state, action: PayloadAction<{ position: number }>) {
      const loopInPosition = !!(
        state.playingLoop &&
        state.playingLoop.start <= action.payload.position &&
        action.payload.position <= state.playingLoop.end
      );

      if (loopInPosition || state.repeatPlayingLoop) {
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
    },
    updateLoop(state, action: PayloadAction<Loop>) {
      state.loops = state.loops.map((loop) => {
        if (loop.id === action.payload.id) {
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
    updateComposition(state, action: PayloadAction<string>) {
      if (!state.playingLoop) return;

      state.loops = state.loops.map((loop) => {
        if (loop.id === state.playingLoop?.id) {
          loop.composition = action.payload;
        }
        return loop;
      });

      state.playingLoop.composition = action.payload;
    },
  },
});

export const {
  initMetadata,
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
  updateComposition,
} = remasterSlice.actions;

export default remasterSlice.reducer;
