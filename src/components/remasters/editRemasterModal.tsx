import { useState, type HTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import RemasterForm from "./remasterForm";
import { useAppSelector } from "@/lib/redux/hooks";

const EditRemasterModal: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);
  const [open, setOpen] = useState(false);

  if (!metadata) return null;

  return (
    <>
      <Dialog modal={false} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            {...props}
            variant="outline"
            className={cn("button-accent flex-1", className)}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h1 className="label">Edit Remaster</h1>
          <ScrollArea className="h-[350px] hr:h-auto">
            <RemasterForm
              key={open ? 1 : 0}
              onFormSubmit={(values) => {
                return;
              }}
              buttonLabel="Save"
              defaultValues={metadata}
              className="mb-8 flex w-full flex-col gap-8 border-b pb-8"
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRemasterModal;
