import { cn, getRelativeTime } from "@/lib/utils";
import { type RemasterResponse } from "@/model";
import { type HTMLAttributes, forwardRef } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import Link from "next/link";

interface RemasterCardProps extends HTMLAttributes<HTMLDivElement> {
  remaster: RemasterResponse;
}

const RemasterCard = forwardRef<HTMLDivElement, RemasterCardProps>(
  ({ remaster, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "relative aspect-video overflow-hidden rounded-md border border-input",
          className,
        )}
      >
        <ReactPlayer url={remaster.url} light width="100%" height="100%" />
        <div className="absolute top-0 h-full w-full bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute left-4 top-4">
          <p className="p mono text-muted-foreground">
            {`@${remaster.user.username} - ${getRelativeTime(
              new Date(remaster.updatedAt),
            )}`}
          </p>
          <h1 className="h1 mono line-clamp-2 text-white">{remaster.name}</h1>
        </div>
        <Button className="absolute bottom-4 right-4" asChild>
          <Link href={`/remaster/${remaster.id}`}>Play</Link>
        </Button>
      </div>
    );
  },
);
RemasterCard.displayName = "RemasterCard";

export default RemasterCard;
