import { useState, type HTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { createLoop } from "@/lib/redux/slices/remasterSlice";
import LoopForm from "./loopForm";

type CreateLoopModalProps = HTMLAttributes<HTMLButtonElement>;

const CreateLoopModal: React.FC<CreateLoopModalProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <Dialog modal={false} open={open} onOpenChange={(o) => setOpen(o)}>
        <DialogTrigger asChild>
          <Button {...props} variant="outline">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h1 className="title mono mb-8 w-full">Create Loop</h1>
          <LoopForm
            onFormSubmit={(values) => {
              dispatch(createLoop(values));
              setOpen(false);
            }}
            buttonLabel="Create Loop"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateLoopModal;
