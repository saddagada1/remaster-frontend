/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { BasicUserResponse } from "./basicUserResponse";

export interface RemasterResponse {
  createdAt: string;
  description?: string;
  duration: number;
  id: string;
  key: number;
  mode: number;
  name: string;
  tempo: number;
  timeSignature: number;
  tuning: number;
  updatedAt: string;
  url: string;
  user: BasicUserResponse;
}