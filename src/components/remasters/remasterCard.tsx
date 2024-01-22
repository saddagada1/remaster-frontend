import { cn, getRelativeTime } from "@/lib/utils";
import { type RemasterResponse } from "@/model";
import { type HTMLAttributes } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface RemasterCardProps extends HTMLAttributes<HTMLDivElement> {
  remaster: RemasterResponse;
}

const RemasterCard: React.FC<RemasterCardProps> = ({
  remaster,
  className,
  ...props
}) => {
  const router = useRouter();
  return (
    <div {...props} className={cn("flex flex-col gap-2", className)}>
      <div className="relative aspect-video overflow-hidden rounded-md border border-input">
        <ReactPlayer url={remaster.url} light width="100%" height="100%" />
      </div>
      <Button
        variant="outline"
        className="flex h-fit flex-col items-stretch justify-between gap-2 p-2 text-left"
        onClick={() => void router.push(`/remaster/${remaster.id}`)}
      >
        <h1 className="p truncate text-base">{remaster.name}</h1>
        <div className="flex items-center">
          <p className="p-accent flex-1 truncate font-sans text-sm normal-case">{`@${remaster.user.username}`}</p>
          <p className="p-accent font-sans text-sm normal-case">
            {getRelativeTime(new Date(remaster.updatedAt))}
          </p>
        </div>
      </Button>
    </div>
  );
};
export default RemasterCard;
