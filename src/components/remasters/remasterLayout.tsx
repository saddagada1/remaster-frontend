import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Orb from "../orb";
import EditRemasterModal from "./editRemasterModal";
import { Button, ButtonLoading } from "../ui/button";
import NoData from "../noData";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";
import { env } from "@/env";
import { useSaveRemaster } from "@/lib/hooks";
import ConfirmModal from "./confirmModal";
import {
  decrementTotalLikes,
  incrementTotalLikes,
  resetRemaster,
  setLikedBySessionUser,
} from "@/lib/redux/slices/remasterSlice";
import {
  useLikeRemaster,
  useUnlikeRemaster,
} from "@/api/remaster-controller/remaster-controller";
import { handleApiError } from "@/lib/utils";

const RemasterActions: React.FC = ({}) => {
  const router = useRouter();
  const remaster = useAppSelector((store) => store.remaster);
  const user = useAppSelector((store) => store.auth.credentials?.user);
  const dispatch = useAppDispatch();
  const { handleSave, savingRemaster, route } = useSaveRemaster();
  const { mutateAsync: like } = useLikeRemaster();
  const { mutateAsync: unlike } = useUnlikeRemaster();

  const handleLike = async () => {
    if (!remaster.metadata) return;
    try {
      await like({ params: { id: remaster.metadata.id } });
      dispatch(setLikedBySessionUser(true));
      dispatch(incrementTotalLikes());
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUnlike = async () => {
    if (!remaster.metadata) return;
    try {
      await unlike({ params: { id: remaster.metadata.id } });
      dispatch(setLikedBySessionUser(false));
      dispatch(decrementTotalLikes());
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      {route && (
        <ConfirmModal
          message="There are unsaved changes. Would you like to save these changes
                before leaving?"
          onCancel={async () => {
            // localStorage.removeItem(remaster.metadata!.id);
            dispatch(resetRemaster());
            await router.push(route);
          }}
          onConfirm={async () => {
            await handleSave();
            dispatch(resetRemaster());
            await router.push(route);
          }}
          confirmLabel="Save"
          cancelLabel="Exit"
          cancelDestructive
        />
      )}
      {router.pathname.includes("editor") ? (
        <>
          <EditRemasterModal />
          {savingRemaster ? (
            <ButtonLoading className="flex-1" />
          ) : (
            <Button
              className="flex-1"
              onClick={() => handleSave()}
              disabled={!remaster.hasChanges}
            >
              Save
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${env.NEXT_PUBLIC_URL}${router.asPath}`,
              );
              toast.success("Copied!");
            }}
            variant="outline"
            className="flex-1 hr:bg-background hr:hover:bg-background/75"
          >
            Share
          </Button>
          {user?.id === remaster.metadata?.userId ? (
            <Button className="flex-1" asChild>
              <Link href={`/editor/${remaster.metadata?.id}`}>Edit</Link>
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (remaster.likedBySessionUser) {
                  void handleUnlike();
                } else {
                  void handleLike();
                }
              }}
              variant={remaster.likedBySessionUser ? "destructive" : "default"}
              className="flex-1"
            >
              {remaster.likedBySessionUser ? "Unlike" : "Like"}
            </Button>
          )}
        </>
      )}
    </>
  );
};

const Topbar: React.FC = ({}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);
  const auth = useAppSelector((store) => store.auth);

  if (!metadata) {
    return <div className="topbar section" />;
  }

  return (
    <nav className="topbar">
      <Orb orientation="top" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          {auth.credentials?.user.id !== metadata.userId ? (
            <Button variant="outline" className="h-full flex-1 p-2" asChild>
              <Link
                href={`/${metadata.username}`}
                className="flex flex-col items-stretch justify-between"
              >
                <h1 className="label">Creator</h1>
                <p className="p leading-none">{metadata.username}</p>
              </Link>
            </Button>
          ) : (
            <div className="section h-full flex-1 overflow-hidden">
              <h1 className="label">Name</h1>
              <p className="p line-clamp-1 leading-none">{metadata.name}</p>
            </div>
          )}
          <div className="section">
            <h1 className="label">Plays</h1>
            <p className="p leading-none">{metadata.totalPlays}</p>
          </div>
          <div className="section">
            <h1 className="label">Likes</h1>
            <p className="p leading-none">{metadata.totalLikes}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <RemasterActions />
        </div>
      </div>
    </nav>
  );
};

const Sidebar: React.FC = ({}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);
  const auth = useAppSelector((store) => store.auth);

  if (!metadata) {
    return <div className="sidebar section" />;
  }

  return (
    <nav className="sidebar">
      <Orb orientation="side" grain />
      <div className="section flex gap-2 bg-muted">
        <RemasterActions />
      </div>
      <div className="section">
        <h1 className="label">Name</h1>
        <p className="p line-clamp-2">{metadata.name}</p>
      </div>
      {auth.credentials?.user.id !== metadata.userId && (
        <Button variant="outline" className="h-fit p-2" asChild>
          <Link
            href={`/${metadata.username}`}
            className="flex flex-col items-stretch justify-between"
          >
            <h1 className="label">Creator</h1>
            <p className="p">{metadata.username}</p>
          </Link>
        </Button>
      )}
      <div className="section">
        <h1 className="label">Plays</h1>
        <p className="p">{metadata.totalPlays}</p>
      </div>
      <div className="section">
        <h1 className="label">Likes</h1>
        <p className="p">{metadata.totalLikes}</p>
      </div>
      <div className="section flex-1">
        <h1 className="label">Description</h1>
        {metadata.description && metadata.description.length > 0 ? (
          <p className="p">{metadata.description}</p>
        ) : (
          <NoData />
        )}
      </div>
    </nav>
  );
};

export { Sidebar, Topbar };
