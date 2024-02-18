import { cn, getRelativeTime } from "@/lib/utils";
import { type BasicRemasterResponse, type RemasterResponse } from "@/model";
import { type HTMLAttributes, forwardRef } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import Link from "next/link";

interface RemasterCardProps extends HTMLAttributes<HTMLDivElement> {
  remaster: RemasterResponse | BasicRemasterResponse;
  small?: boolean;
}

const RemasterCard = forwardRef<HTMLDivElement, RemasterCardProps>(
  ({ remaster, small, className, ...props }, ref) => {
    return (
      <>
        {small ? (
          <div
            {...props}
            ref={ref}
            className={cn("section flex gap-2 overflow-hidden", className)}
          >
            <div className="aspect-video w-1/2 overflow-hidden rounded lg:w-1/3">
              <ReactPlayer
                url={remaster.url}
                light
                width="100%"
                height="100%"
              />
            </div>
            <div className="relative flex-1">
              <p className="p-accent mono">
                {`@${remaster.user.username} - ${getRelativeTime(
                  new Date(remaster.createdAt),
                )}`}
              </p>
              <h1 className="h3 mono line-clamp-1 text-white lg:line-clamp-2">
                {remaster.name}
              </h1>
              <Button
                variant="outline"
                className="absolute bottom-0 right-0"
                asChild
              >
                <Link href={`/remaster/${remaster.id}`}>Play</Link>
              </Button>
            </div>
          </div>
        ) : (
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
              <p className="p mono text-muted-foreground 2xl:text-sm 2xl:font-normal">
                {`@${remaster.user.username} - ${getRelativeTime(
                  new Date(remaster.createdAt),
                )}`}
              </p>
              <h1 className="h2 mono line-clamp-2 text-white">
                {remaster.name}
              </h1>
            </div>
            <Button className="absolute bottom-4 right-4" asChild>
              <Link href={`/remaster/${remaster.id}`}>Play</Link>
            </Button>
          </div>
        )}
      </>
    );
  },
);
RemasterCard.displayName = "RemasterCard";

export default RemasterCard;
