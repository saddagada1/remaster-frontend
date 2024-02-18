import { Button } from "./ui/button";
import SearchInput from "./searchInput";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { type UserResponse } from "@/model";
import { useLogoutUser } from "@/api/authentication-controller/authentication-controller";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/router";

const UserMenu: React.FC<{ user: UserResponse }> = ({ user }) => {
  const router = useRouter();
  const { mutateAsync: logout } = useLogoutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-background hover:bg-background/75"
        >
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mono w-56" align="end" forceMount>
        <DropdownMenuLabel className="ml-2">
          <p className="mb-1 text-sm">
            {!!user.name ? user.name : user.username}
          </p>
          <p className="p-accent font-normal">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/profile">View Profile</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/likes">Likes</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/settings">Settings</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={async () => {
              await logout();
              router.reload();
            }}
            variant="ghost"
            className="mono w-full justify-start hover:bg-destructive hover:text-background"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header: React.FC = ({}) => {
  const auth = useAppSelector((store) => store.auth);

  return (
    <header className="hidden items-center gap-2 hr:flex">
      <SearchInput className="w-full" />
      {auth.status !== "loading" && (
        <div className="section flex h-full items-center justify-center gap-2 bg-muted">
          {auth.status === "authenticated" ? (
            <>
              {auth.credentials?.user ? (
                <UserMenu user={auth.credentials.user} />
              ) : null}
              <Button asChild>
                <Link href="/create">Create</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="bg-background hover:bg-background/75"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
