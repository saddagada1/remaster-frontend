import { env } from "@/env";
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { type QueuedRequest } from "./types";
import { store } from "./redux/store";
import { setAuthState } from "./redux/slices/authSlice";
import { refreshToken } from "@/api/authentication-controller/authentication-controller";
import { handleApiError } from "./utils";
import Router from "next/router";

export const client = axios.create({
  baseURL: env.NEXT_PUBLIC_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let requestQueue: QueuedRequest[] = [];

const processRequestQueue = ({
  error,
  token,
}: {
  error: unknown;
  token: string | null;
}) => {
  requestQueue.map((request) => {
    if (!token) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  requestQueue = [];
};

client.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("open") || config.url?.includes("auth"))
      return config;
    const controller = new AbortController();
    const { auth } = store.getState();
    if (!auth.credentials) {
      console.log("no auth");
      if (auth.status !== "loading") {
        void Router.replace("/login");
      }
      controller.abort();
      return {
        ...config,
        signal: controller.signal,
      };
    }
    if (auth.credentials.expiresAt < Date.now() / 1000) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) =>
            requestQueue.push({ resolve, reject }),
          );
          config.headers.Authorization = `Bearer ${token as string}`;
          return config;
        } catch (error) {
          controller.abort();
          return {
            ...config,
            signal: controller.signal,
          };
        }
      }
      isRefreshing = true;
      console.log("refreshing auth");
      try {
        const response = await refreshToken();
        console.log("refreshed auth");
        const credentials = response.data;
        store.dispatch(
          setAuthState({
            status: "authenticated",
            credentials: {
              accessToken: credentials.accessToken,
              expiresAt: Date.parse(credentials.expiresAt),
              user: credentials.user,
            },
          }),
        );
        config.headers.Authorization = `Bearer ${credentials.accessToken}`;
        processRequestQueue({ error: null, token: credentials.accessToken });
        isRefreshing = false;
        return config;
      } catch (error) {
        handleApiError(error);
        processRequestQueue({ error: error, token: null });
        isRefreshing = false;
        controller.abort();
        return {
          ...config,
          signal: controller.signal,
        };
      }
    }
    console.log("vaild auth");
    config.headers.Authorization = `Bearer ${auth.credentials.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError | Error) => {
    const { auth } = store.getState();
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config;
      if (!originalRequest) {
        return Promise.reject(error);
      }
      const { status } = (error.response as AxiosResponse) ?? {};
      if (status === 403) {
        console.log("auth error");
        if (!auth.credentials) {
          if (auth.status !== "loading") {
            void Router.replace("/login");
          }
          return Promise.reject(error);
        }
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) =>
              requestQueue.push({ resolve, reject }),
            );
            originalRequest.headers.Authorization = `Bearer ${token as string}`;
            return client(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        isRefreshing = true;
        try {
          const response = await refreshToken();
          console.log("refreshed auth");
          const credentials = response.data;
          store.dispatch(
            setAuthState({
              status: "authenticated",
              credentials: {
                accessToken: credentials.accessToken,
                expiresAt: Date.parse(credentials.expiresAt),
                user: credentials.user,
              },
            }),
          );
          originalRequest.headers.Authorization = `Bearer ${credentials.accessToken}`;
          processRequestQueue({
            error: null,
            token: credentials.accessToken,
          });
          isRefreshing = false;
          return client(originalRequest);
        } catch (error) {
          handleApiError(error);
          processRequestQueue({ error: error, token: null });
          isRefreshing = false;
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const customInstance = <T>(config: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();
  const promise = client({
    ...config,
    cancelToken: source.token,
  }).then((res) => ({ ...res, data: res.data as T }));

  return promise;
};

export type BodyType<BodyData> = BodyData;
