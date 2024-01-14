import Link from "next/link";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ExitIcon, SunIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { useLogoutUser } from "@/api/authentication-controller/authentication-controller";
import SearchInput from "./searchInput";
import Orb from "./orb";

interface NavButtonProps {
  href: string;
  label: string;
  description: string;
}

const NavButton: React.FC<NavButtonProps> = ({ href, label, description }) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="lg"
      asChild
      className={cn(
        "h-fit p-2 font-normal",
        router.pathname === href && "bg-accent",
      )}
    >
      <Link href={href} className="flex flex-col space-y-2">
        <p className="w-full text-xs font-medium tracking-tight sm:text-sm">
          {label}
        </p>
        <p className="p-accent w-full truncate">{description}</p>
      </Link>
    </Button>
  );
};

const SideNavbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sidebar">
      <Orb orientation="side" grain />
      <div className="section flex flex-1 flex-col">
        <Link href="/" className="h1 mb-6 font-display">
          remaster
        </Link>
        <p className="p-accent w-3/4">
          Empowering musicians to create, connect, and embrace their own unique
          sound.
        </p>
        <div className="mt-12 flex-1 space-y-2">
          <NavButton href="/" label="Discover" description="Something New" />
          <NavButton
            href="/trending"
            label="Trending"
            description="Something Popular"
          />
          <NavButton
            href="/favourites"
            label="Favourites"
            description="Something Loved"
          />
          <NavButton
            href="/library"
            label="Library"
            description="Something Personal"
          />
        </div>
        <div className="flex items-end">
          <p className="p-accent flex-1">2@24</p>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            variant="outline"
            size="icon"
          >
            <SunIcon />
          </Button>
        </div>
      </div>
    </nav>
  );
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { mutateAsync: logout } = useLogoutUser();

  if (auth.status === "loading") {
    return <nav className="section h-24 w-full shrink-0 hr:hidden" />;
  }

  return (
    <nav className="topbar">
      <Orb orientation="top" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          {auth.status === "authenticated" ? (
            <>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "button-accent flex-1",
                  router.pathname === "/profile" && "bg-background/80",
                )}
              >
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                asChild
                className={cn(
                  "flex-1",
                  router.pathname === "/create" && "bg-foreground/80",
                )}
              >
                <Link href="/create">Create</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "button-accent flex-1",
                  router.pathname === "/sign-up" && "bg-background/80",
                )}
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button
                asChild
                className={cn(
                  "flex-1",
                  router.pathname === "/login" && "bg-foreground/80",
                )}
              >
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}

          <Drawer open={open} onOpenChange={(o) => setOpen(o)}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="button-accent">
                Menu
              </Button>
            </DrawerTrigger>
            <DrawerContent className="mono flex h-5/6 flex-col p-2">
              <Link href="/" className="h1 my-6 font-display">
                remaster
              </Link>
              <p className="p-accent w-3/4">
                Empowering musicians to create, connect, and embrace their own
                unique sound.
              </p>
              <div className="mt-12 flex-1 space-y-2">
                <NavButton
                  href="/"
                  label="Discover"
                  description="Something New"
                />
                <NavButton
                  href="/trending"
                  label="Trending"
                  description="Something Popular"
                />
                <NavButton
                  href="/favourites"
                  label="Favourites"
                  description="Something Loved"
                />
                <NavButton
                  href="/library"
                  label="Library"
                  description="Something Personal"
                />
              </div>
              <div className="flex items-end gap-2">
                <p className="p-accent flex-1">2@24</p>
                <Button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  variant="outline"
                  size="icon"
                >
                  <SunIcon />
                </Button>
                <Button
                  onClick={() => void logout()}
                  variant="outline"
                  size="icon"
                >
                  <ExitIcon />
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <SearchInput className="h-full w-full" />
      </div>
    </nav>
  );
};

export { Navbar, SideNavbar };
