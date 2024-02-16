import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useUpdateRemaster } from "@/api/remaster-controller/remaster-controller";
import { toast } from "sonner";
import { resetRemaster, setHasChanges } from "./redux/slices/remasterSlice";

export const useSaveRemaster = () => {
  const router = useRouter();
  const [route, setRoute] = useState<string | null>(null);
  const remaster = useAppSelector((store) => store.remaster);
  const dispatch = useAppDispatch();
  const [currentSave, setCurrentSave] = useState({
    ...remaster.metadata,
    loops: remaster.loops,
  });
  const { mutateAsync: saveRemaster, isPending: savingRemaster } =
    useUpdateRemaster();

  const handleSave = async () => {
    if (!remaster.metadata) return;
    const loading = toast.loading("Saving...Please Wait");
    await saveRemaster({
      data: {
        ...remaster.metadata,
        loops: JSON.stringify(remaster.loops),
      },
    });
    setCurrentSave({ ...remaster.metadata, loops: remaster.loops });
    dispatch(setHasChanges(false));
    // localStorage.removeItem(remaster.metadata.id);
    toast.dismiss(loading);
    toast.success("Saved!");
  };

  useEffect(() => {
    if (!remaster.metadata || !router.pathname.includes("editor")) return;
    const currentState = { ...remaster.metadata, loops: remaster.loops };
    if (JSON.stringify(currentSave) !== JSON.stringify(currentState)) {
      dispatch(setHasChanges(true));
    } else {
      dispatch(setHasChanges(false));
    }
  }, [remaster.metadata, remaster.loops]);

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (!remaster.hasChanges) {
        dispatch(resetRemaster());
        return;
      }
      setRoute(url);
      throw "Aborting route change. You can safely ignore this error.";
    };

    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [remaster.hasChanges]);

  return {
    handleSave,
    savingRemaster,
    route,
  };
};
