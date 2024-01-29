export interface QueuedRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export interface ApiError {
  subject: string;
  message: string;
}

export interface Tuning {
  name: string;
  notes: string[];
}

export interface Loop {
  [key: string]: string | number;
  id: number;
  start: number;
  end: number;
  key: number;
  mode: number;
  composition: string;
}

export interface Metadata {
  id: string;
  url: string;
  name: string;
  description?: string;
  duration: number;
  key: number;
  mode: number;
  tempo: number;
  timeSignature: number;
  tuning: number;
  userId: string;
}

export interface Tab {
  head: string[];
  frets: string[][];
}
