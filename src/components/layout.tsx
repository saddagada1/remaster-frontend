import Head from "next/head";
import { useWindowSize } from "usehooks-ts";
import { Navbar, SideNavbar } from "./navbar";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Head>
        <meta name="description" content="Remaster - Rediscover your music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ maxWidth: width, maxHeight: height }}
        className="flex h-screen w-screen flex-col gap-2 p-2 font-sans lg:flex-row"
      >
        <SideNavbar />
        <Navbar />
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
