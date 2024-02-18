import { type UserResponse } from "@/model";
import { Button } from "./ui/button";
import Link from "next/link";
import { compactValue, handleApiError } from "@/lib/utils";
import NoData from "./noData";
import SafeImage from "./safeImage";
import { useRouter } from "next/router";
import {
  useFollowUser,
  useUnfollowUser,
} from "@/api/user-controller/user-controller";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  decrementTotalFollowing,
  incrementTotalFollowing,
} from "@/lib/redux/slices/authSlice";

interface UserLayoutProps {
  user?: UserResponse;
}

const UserLayout: React.FC<UserLayoutProps> = ({ user }) => {
  const router = useRouter();
  const { mutateAsync: follow } = useFollowUser();
  const { mutateAsync: unfollow } = useUnfollowUser();
  const dispatch = useAppDispatch();

  const handleFollow = async () => {
    if (!user) return;
    try {
      await follow({ params: { id: user.id } });
      user.totalFollowers += 1;
      user.followedBySessionUser = true;
      dispatch(incrementTotalFollowing());
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUnfollow = async () => {
    if (!user) return;
    try {
      await unfollow({ params: { id: user.id } });
      user.totalFollowers -= 1;
      user.followedBySessionUser = false;
      dispatch(decrementTotalFollowing());
    } catch (error) {
      handleApiError(error);
    }
  };

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
            <p>{compactValue(user.totalRemasters)}</p>
          </div>
          <Button
            variant="outline"
            className="h-fit flex-1 p-2 focus-visible:ring-0 disabled:justify-start disabled:opacity-100"
            asChild={router.pathname === "/profile"}
            disabled={router.pathname !== "/profile"}
          >
            <Link
              href="/followers"
              className="flex h-full flex-col items-stretch"
            >
              <h1 className="label flex-1">Followers</h1>
              <p className="p text-left">{compactValue(user.totalFollowers)}</p>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-fit flex-1 p-2 focus-visible:ring-0 disabled:justify-start disabled:opacity-100"
            asChild={router.pathname === "/profile"}
            disabled={router.pathname !== "/profile"}
          >
            <Link
              href="/following"
              className="flex h-full flex-col items-stretch"
            >
              <h1 className="label flex-1">Following</h1>
              <p className="p text-left">{compactValue(user.totalFollowing)}</p>
            </Link>
          </Button>
        </div>
      </div>
      <div className="section flex gap-2 bg-muted">
        {router.pathname === "/profile" ? (
          <>
            <Button
              variant="outline"
              className="flex-1 bg-background hover:bg-background/75"
              asChild
            >
              <Link href="/likes">Likes</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              if (!!user.followedBySessionUser) {
                void handleUnfollow();
              } else {
                void handleFollow();
              }
            }}
            variant={!!user.followedBySessionUser ? "destructive" : "default"}
            className="flex-1"
          >
            {!!user.followedBySessionUser ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <div className="section">
        <h1 className="label">Name</h1>
        <p className="p">{!!user.name ? user.name : user.username}</p>
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
