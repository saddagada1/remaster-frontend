import { useAppSelector } from "@/lib/redux/hooks";
import { cn, handleApiError } from "@/lib/utils";
import { type HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { useSendVerificationEmail } from "@/api/authentication-controller/authentication-controller";
import { toast } from "sonner";

const VerifyBanner: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const user = useAppSelector((store) => store.auth.credentials?.user);
  const { mutateAsync: sendEmail } = useSendVerificationEmail();

  if (!user || user.verified) {
    return;
  }
  return (
    <div
      {...props}
      className={cn(
        "section p mono flex h-10 items-center justify-center text-xs 2xl:text-sm",
        className,
      )}
    >
      <p>Please verify your account.</p>
      &nbsp;
      <p className="hidden lg:block">It is required to use Remaster.</p>
      &nbsp;
      <Button
        onClick={async () => {
          try {
            const pending = toast.loading("Sending...Please Wait");
            await sendEmail();
            toast.dismiss(pending);
            toast.success("Success! Check your inbox.");
          } catch (error) {
            handleApiError(error);
          }
        }}
        variant="link"
        className="px-0 underline"
      >
        Click Here.
      </Button>
    </div>
  );
};
export default VerifyBanner;
