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
import { resetRemaster } from "@/lib/redux/slices/remasterSlice";

const RemasterActions: React.FC = ({}) => {
  const router = useRouter();
  const remaster = useAppSelector((store) => store.remaster);
  const user = useAppSelector((store) => store.auth.credentials?.user);
  const dispatch = useAppDispatch();
  const { handleSave, savingRemaster, route } = useSaveRemaster();

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
            className="button-accent flex-1"
          >
            Share
          </Button>
          {user?.id === remaster.metadata?.userId ? (
            <Button className="flex-1" asChild>
              <Link href={`/editor/${remaster.metadata?.id}`}>Edit</Link>
            </Button>
          ) : (
            <Button className="flex-1">Like</Button>
          )}
        </>
      )}
    </>
  );
};

const Topbar: React.FC = ({}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);

  if (!metadata) {
    return <div className="topbar section" />;
  }

  return (
    <nav className="topbar">
      <Orb orientation="top" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="section">
          <h1 className="label">Name</h1>
          <p className="p truncate">{metadata.name}</p>
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
        <p className="p">{metadata.name}</p>
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
