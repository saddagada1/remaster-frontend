import { type Tuning } from "./types";

export const openPaths = ["/welcome", "/login", "/sign-up", "/"];
export const authPaths = ["/welcome", "/login", "/sign-up"];

export const tuning: Record<number, Tuning> = {
  0: { name: "Standard", notes: ["E", "A", "D", "G", "B", "E"] },
  1: { name: "0.5 Down", notes: ["D#", "G#", "C#", "F#", "A#", "D#"] },
  2: { name: "1 Down", notes: ["D", "G", "C", "F", "A", "D"] },
  3: { name: "1.5 Down", notes: ["C#", "F#", "B", "E", "G#", "C#"] },
  4: { name: "Drop D", notes: ["D", "A", "D", "G", "B", "E"] },
  5: { name: "Drop C#", notes: ["C#", "G#", "C#", "F#", "A#", "D#"] },
  6: { name: "Drop C", notes: ["C", "G", "C", "F", "A", "D"] },
  7: { name: "Open G", notes: ["D", "G", "D", "G", "B", "D"] },
  8: { name: "Open F", notes: ["F", "A", "C", "F", "C", "F"] },
  9: { name: "DADGAD", notes: ["D", "A", "D", "G", "A", "D"] },
};

export const timeSignature: Record<number, string> = {
  0: "2/2",
  1: "2/4",
  2: "3/4",
  3: "4/4",
  4: "5/4",
  5: "6/8",
  6: "9/8",
  7: "12/8",
};

export const mode: Record<number, string> = {
  0: "Minor",
  1: "Major",
};

export const pitchClass: Record<number, string> = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

export const pitchClassColours: Record<number, string> = {
  0: "#ef4444",
  1: "#f97316",
  2: "#eab308",
  3: "#84cc16",
  4: "#22c55e",
  5: "#14b8a6",
  6: "#06b6d4",
  7: "#3b82f6",
  8: "#8b5cf6",
  9: "#d946ef",
  10: "#ec4899",
  11: "#f43f5e",
};

export const colourMod = "CC";
