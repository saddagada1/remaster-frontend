import { type AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { Theme } from "@/components/theme";
import Layout from "@/components/layout";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import IsAuth from "@/components/isAuth";

const display = Syne({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Inter({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-mono",
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-display: ${display.style.fontFamily};
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <Theme attribute="class" defaultTheme="dark">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-left"
              richColors
              toastOptions={{ className: "mono" }}
            />
            <Layout>
              <IsAuth>
                <Component {...pageProps} />
              </IsAuth>
            </Layout>
          </QueryClientProvider>
        </Provider>
      </Theme>
    </>
  );
};

export default MyApp;
