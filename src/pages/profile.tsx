import type { NextPage } from "next";
import Head from "next/head";
import { useGetAllUserRemastersInfinite } from "@/api/remaster-controller/remaster-controller";
import { useAppSelector } from "@/lib/redux/hooks";
import UserLayout from "@/components/userLayout";
import RemasterCard from "@/components/remasters/remasterCard";
import { useMemo, useRef } from "react";
import { defaultPaginationLimit } from "@/lib/constants";
import InfinitePagination from "@/components/infinitePagination";
import NoData from "@/components/noData";
import { SimpleLoading } from "@/components/loading";

const Profile: NextPage = ({}) => {
  const lastItem = useRef<HTMLDivElement>(null!);
  const {
    data: remasterPages,
    isLoading,
    fetchNextPage,
  } = useGetAllUserRemastersInfinite(
    { limit: defaultPaginationLimit },
    {
      query: {
        getNextPageParam: (page) => page.data.next,
      },
    },
  );
  const user = useAppSelector((store) => store.auth.credentials?.user);

  const remasters = useMemo(() => {
    return remasterPages?.pages.flatMap((page) => page.data.items);
  }, [remasterPages]);

  return (
    <>
      <Head>
        <title>Remaster - Profile</title>
      </Head>
      <main className="profile-layout">
        {remasters ? (
          <InfinitePagination
            lastItem={lastItem}
            onLastItem={() => void fetchNextPage()}
            loading={isLoading}
            className="flex-1"
          >
            <div className="profile-grid">
              {remasters?.map((remaster, index) => (
                <RemasterCard
                  ref={
                    index === (remasters?.length ?? 0) - 1
                      ? lastItem
                      : undefined
                  }
                  key={index}
                  remaster={remaster}
                />
              ))}
            </div>
          </InfinitePagination>
        ) : !!isLoading ? (
          <NoData className="section h-full">
            No remasters have been made :(
          </NoData>
        ) : (
          <div className="section flex flex-1 items-center justify-center">
            <SimpleLoading />
          </div>
        )}
        <UserLayout user={user} />
      </main>
    </>
  );
};

export default Profile;
