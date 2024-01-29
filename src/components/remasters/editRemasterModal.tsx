import { useState, type HTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import RemasterForm from "./remasterForm";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import ConfirmModal from "./confirmModal";
import { setMetadata } from "@/lib/redux/slices/remasterSlice";

const EditRemasterModal: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  if (!metadata) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            {...props}
            variant="outline"
            className={cn("button-accent flex-1", className)}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="hr:max-w-[600px] ">
          <ScrollArea className="h-[600px] hr:h-auto">
            <h1 className="title mono mb-8 w-full pl-2 hr:pl-2">
              Edit Remaster
            </h1>
            <RemasterForm
              key={open ? 1 : 0}
              onFormSubmit={(values) => {
                dispatch(setMetadata({ ...metadata, ...values }));
                setOpen(false);
              }}
              buttonLabel="Save"
              defaultValues={metadata}
              className="mb-8 flex flex-col gap-8 lg:flex-row hr:px-2"
            >
              <ConfirmModal
                message="This action cannot be undone. This will permanently
                  delete your remaster and remove the data from our servers."
                withTrigger
                trigger={
                  <Button variant="destructive" size="lg">
                    Delete
                  </Button>
                }
                confirmLabel="Delete"
                onConfirm={() => {
                  setOpen(false);
                }}
                confirmDestructive
              />
            </RemasterForm>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRemasterModal;
