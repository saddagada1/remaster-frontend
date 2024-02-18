import { useGetUserFollowingInfinite } from "@/api/user-controller/user-controller";
import InfinitePagination from "@/components/infinitePagination";
import { SimpleLoading } from "@/components/loading";
import Marquee from "@/components/marquee";
import NoData from "@/components/noData";
import UserCard from "@/components/userCard";
import { defaultPaginationLimit } from "@/lib/constants";
import { type NextPage } from "next";
import Head from "next/head";
import { useMemo, useRef } from "react";

const Following: NextPage = ({}) => {
  const lastItem = useRef<HTMLDivElement>(null!);
  const {
    data: userPages,
    isLoading,
    fetchNextPage,
  } = useGetUserFollowingInfinite(
    { limit: defaultPaginationLimit },
    {
      query: {
        getNextPageParam: (page) => page.data.next,
      },
    },
  );

  const users = useMemo(() => {
    return userPages?.pages.flatMap((page) => page.data.items);
  }, [userPages]);

  return (
    <>
      <Head>
        <title>Remaster - Following</title>
      </Head>
      <main className="flex flex-1 flex-col gap-2">
        <Marquee>Your Following</Marquee>
        {!!users && users.length > 0 ? (
          <InfinitePagination
            lastItem={lastItem}
            onLastItem={() => void fetchNextPage()}
            loading={isLoading}
            className="flex-1"
          >
            <div className="default-remaster-grid">
              {users?.map((user, index) => (
                <UserCard
                  ref={
                    index === (users?.length ?? 0) - 1 ? lastItem : undefined
                  }
                  key={index}
                  user={user}
                />
              ))}
            </div>
          </InfinitePagination>
        ) : !isLoading ? (
          <NoData className="section h-full">
            You haven't followed anyone :(
          </NoData>
        ) : (
          <div className="section flex flex-1 items-center justify-center">
            <SimpleLoading />
          </div>
        )}
      </main>
    </>
  );
};
export default Following;
