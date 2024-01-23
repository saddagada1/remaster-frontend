import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRefreshToken } from "@/api/authentication-controller/authentication-controller";
import { setAuthState } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/router";
import { authPaths, privatePaths } from "@/lib/constants";
import { useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import Loading from "./loading";

const IsAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const { mutateAsync: refreshToken } = useRefreshToken();
  const router = useRouter();

  useEffectOnce(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshToken();
        if (authPaths.some((path) => router.pathname.includes(path))) {
          await router.replace("/");
        }
        dispatch(
          setAuthState({
            status: "authenticated",
            credentials: {
              accessToken: response.data.accessToken,
              expiresAt: Date.parse(response.data.expiresAt),
              user: response.data.user,
            },
          }),
        );
      } catch (error) {
        if (privatePaths.some((path) => router.pathname.includes(path))) {
          await router.replace("/login");
        }
        dispatch(
          setAuthState({
            status: "unauthenticated",
            credentials: null,
          }),
        );
      }
    };
    if (auth.status === "loading") {
      void checkAuth();
    }
  });

  useEffect(() => {
    if (auth.status === "loading") return;

    const routeChangeStart = (url: string) => {
      if (url === router.pathname) return;
      if (auth.status === "unauthenticated") {
        if (privatePaths.some((path) => url.includes(path))) {
          throw "Aborting route change. You can safely ignore this error.";
        }
      } else if (auth.status === "authenticated") {
        if (authPaths.some((path) => url.includes(path))) {
          throw "Aborting route change. You can safely ignore this error.";
        }
        if (auth.credentials?.user.username === url.slice(1, url.length)) {
          void router.replace("/profile");
        }
      }
    };

    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [router, auth]);

  return auth.status === "loading" ? <Loading /> : children;
};

export default IsAuth;
