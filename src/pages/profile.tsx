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
      <main className="flex flex-1 flex-col-reverse justify-start gap-2 md:flex-row">
        <InfinitePagination
          lastItem={lastItem}
          onLastItem={() => void fetchNextPage()}
          loading={isLoading}
          className="flex-1"
        >
          {remasters && remasters.length > 0 ? (
            <div className="grid grid-flow-row gap-2 md:grid-cols-2 2xl:grid-cols-3">
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
          ) : (
            !isLoading && <NoData>No remasters have been made :(</NoData>
          )}
        </InfinitePagination>
        <UserLayout user={user} remasterCount={1} />
      </main>
    </>
  );
};

export default Profile;
