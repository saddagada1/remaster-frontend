import Head from "next/head";
import { useWindowSize } from "usehooks-ts";
import { Navbar, SideNavbar } from "./navbar";
import Header from "./header";
import { useRouter } from "next/router";
import { Sidebar, Topbar } from "./remasters/remasterLayout";
import VerifyBanner from "./verifyBanner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { width, height } = useWindowSize();
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Remaster - Rediscover your music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ maxWidth: width, maxHeight: height }}
        className="relative flex h-screen w-screen flex-col gap-2 overflow-hidden p-2 font-sans hr:flex-row"
      >
        <div className="anim-grain opacity-10 mix-blend-overlay" />
        {router.pathname.includes("editor") ||
        router.pathname.includes("remaster") ? (
          <>
            <Sidebar />
            <Topbar />
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
              {children}
            </div>
          </>
        ) : (
          <>
            <SideNavbar />
            <Navbar />
            <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
              <Header />
              <VerifyBanner />
              {children}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
