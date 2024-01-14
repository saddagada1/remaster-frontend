import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AxiosError } from "axios";
import { type ApiError } from "./types";
import { toast } from "sonner";
dayjs.extend(relativeTime);

export const buildUsername = (email: string) => {
  return (
    email.split("@")[0]?.slice(0, 5) + Math.random().toString(36).slice(2, 10)
  );
};

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => {
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const getRelativeTime = (time: Date) => {
  return dayjs(time).fromNow();
};

export const compactValue = (value: number) => {
  return value.toLocaleString(undefined, {
    notation: "compact",
  });
};

export const trimmedString = (str: string) => {
  return str.replace(/\s+/g, " ").trim();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getVideoTimestamp = (position: number) => {
  const minutes = Math.floor(position / 60);
  const seconds = position % 60;
  return `${minutes}:${
    seconds.toString().length === 1 ? "0" + seconds : seconds
  }`;
};

export const checkIfApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const apiError = error as AxiosError<ApiError>;
    if (!!apiError.response) {
      return apiError.response.data;
    } else {
      return error.status;
    }
  }
};

export const handleApiError = (
  error: unknown,
  options?: { fatal?: boolean },
) => {
  if ((error as { message: string }).message === "canceled") return;
  const apiError = checkIfApiError(error);
  if (!!apiError && !options?.fatal) {
    if (typeof apiError === "number") {
      switch (apiError) {
        case 403:
          toast("please login before proceeding");
      }
    } else {
      toast.error(`${apiError.subject}: ${apiError.message}`);
    }
  } else {
    toast.error("something went wrong. please refresh and try again.");
  }
};
