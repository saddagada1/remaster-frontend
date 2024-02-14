import { type UserResponse } from "@/model";
import { Button } from "./ui/button";
import Link from "next/link";
import { compactValue } from "@/lib/utils";
import NoData from "./noData";
import SafeImage from "./safeImage";

interface UserLayoutProps {
  user?: UserResponse;
  remasterCount: number;
}

const UserLayout: React.FC<UserLayoutProps> = ({ user, remasterCount }) => {
  if (!user) {
    return (
      <div className="section flex h-[300px] w-full shrink-0 flex-col justify-end gap-2 md:h-full md:w-[200px] 2xl:w-[250px]" />
    );
  }
  return (
    <div className="flex w-full shrink-0 flex-col justify-end gap-2 md:w-[200px] 2xl:w-[250px]">
      <div className="flex gap-2 md:flex-col">
        <div className="section">
          <SafeImage url={user.image} alt={user.name ?? user.username} grain />
        </div>
        <div className="flex min-w-[45%] flex-col gap-2">
          <div className="section flex flex-1 flex-col justify-between">
            <h1 className="label">Remasters</h1>
            <p>{compactValue(remasterCount)}</p>
          </div>
          <Button variant="outline" className="h-fit flex-1 p-2" asChild>
            <Link
              href="/followers"
              className="flex flex-col items-stretch justify-between"
            >
              <h1 className="label">Followers</h1>
              <p className="p">{compactValue(0)}</p>
            </Link>
          </Button>
          <Button variant="outline" className="h-fit flex-1 p-2" asChild>
            <Link
              href="/following"
              className="flex flex-col items-stretch justify-between"
            >
              <h1 className="label">Following</h1>
              <p className="p">{compactValue(0)}</p>
            </Link>
          </Button>
        </div>
      </div>
      <div className="section flex gap-2 bg-muted">
        <Button className="button-accent flex-1" asChild>
          <Link href="/likes">Likes</Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <div className="section">
        <h1 className="label">Name</h1>
        <p className="p">{user.name ?? user.username}</p>
      </div>
      <div className="section flex-1 overflow-y-scroll">
        <h1 className="label">Bio</h1>
        {user?.bio && user.bio.length > 0 ? (
          <p className="p">{user.bio}</p>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default UserLayout;
