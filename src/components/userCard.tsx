import { cn } from "@/lib/utils";
import { type UserResponse } from "@/model";
import { type HTMLAttributes, forwardRef } from "react";
import SafeImage from "./safeImage";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  user: UserResponse;
}

const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  ({ user, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "flex overflow-hidden rounded-md border border-input",
          className,
        )}
      >
        <div className="aspect-square w-1/3 border-r border-input p-2">
          <SafeImage url={user.image} alt={user.name ?? user.username} grain />
        </div>
        <div className="flex flex-1 flex-col items-end bg-accent/50 p-2">
          <div className="w-full flex-1 pl-2">
            <p className="p mono mb-1 text-muted-foreground">
              {!!user.name ? `@${user.username}` : `User`}
            </p>
            <h1 className="h1 mono line-clamp-2 text-white ">
              {!!user.name ? user.name : `@${user.username}`}
            </h1>
          </div>
          <Button asChild className="m-2">
            <Link href={`/${user.username}`}>View</Link>
          </Button>
        </div>
      </div>
    );
  },
);
UserCard.displayName = "UserCard";

export default UserCard;
