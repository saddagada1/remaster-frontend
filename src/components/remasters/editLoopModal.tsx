import { useState, type HTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateLoop, deleteLoop } from "@/lib/redux/slices/remasterSlice";
import LoopForm from "./loopForm";
import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { type Loop } from "@/lib/types";
import ConfirmModal from "./confirmModal";

interface EditLoopModalProps extends HTMLAttributes<HTMLButtonElement> {
  loop: Loop;
}

const EditLoopModal: React.FC<EditLoopModalProps> = ({
  className,
  loop,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <Dialog modal={false} open={open} onOpenChange={(o) => setOpen(o)}>
        <DialogTrigger asChild>
          <Button variant="link" {...props} className={cn("h-fit", className)}>
            <Pencil2Icon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h1 className="title mono mb-8 w-full">Edit Loop</h1>
          <LoopForm
            defaultValues={{
              key: loop.key,
              mode: loop.mode,
            }}
            onFormSubmit={(values) => {
              dispatch(updateLoop({ ...loop, ...values }));
              setOpen(false);
            }}
            buttonLabel="Save"
          >
            <ConfirmModal
              message="This action cannot be undone. This will permanently
                  delete your loop and remove the data from our servers."
              withTrigger
              trigger={
                <Button variant="destructive" size="lg">
                  Delete
                </Button>
              }
              confirmLabel="Delete"
              onConfirm={() => {
                dispatch(deleteLoop(loop));
                setOpen(false);
              }}
              confirmDestructive
            />
          </LoopForm>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditLoopModal;
