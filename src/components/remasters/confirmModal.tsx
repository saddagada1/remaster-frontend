import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ConfirmModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  withTrigger?: boolean;
  trigger?: React.ReactNode;
  cancelDestructive?: boolean;
  confirmDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onCancel,
  onConfirm,
  title,
  message,
  cancelLabel,
  confirmLabel,
  withTrigger,
  trigger,
  cancelDestructive,
  confirmDestructive,
}) => {
  return (
    <AlertDialog defaultOpen={!withTrigger}>
      {withTrigger && (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <h1 className="title mono w-full">{title ?? "Confirm"}</h1>
        <p className="p-accent mono">
          {message ?? "This action cannot be undone."}
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => onCancel && onCancel()}
            className={cn("mono h-10", cancelDestructive && "bg-destructive")}
          >
            {cancelLabel ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm && onConfirm()}
            className={cn("mono h-10", confirmDestructive && "bg-destructive")}
          >
            {confirmLabel ?? "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmModal;
