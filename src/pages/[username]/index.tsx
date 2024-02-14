import type { NextPage } from "next";
import Head from "next/head";
import Loading from "@/components/loading";
import UserLayout from "@/components/userLayout";
import RemasterCard from "@/components/remasters/remasterCard";
import { useGetUserByUsername } from "@/api/user-controller/user-controller";
import { useRouter } from "next/router";
import { useGetAllRemastersByUserIdInfinite } from "@/api/remaster-controller/remaster-controller";
import { useMemo, useRef } from "react";
import { defaultPaginationLimit } from "@/lib/constants";
import InfinitePagination from "@/components/infinitePagination";
import NoData from "@/components/noData";

const User: NextPage = ({}) => {
  const lastItem = useRef<HTMLDivElement>(null!);
  const router = useRouter();
  const { data: user, isLoading: fetchingUser } = useGetUserByUsername(
    router.query.username as string,
    {
      query: {
        enabled: typeof router.query.username === "string",
      },
    },
  );
  const {
    data: remasterPages,
    isLoading: fetchingRemasters,
    fetchNextPage,
  } = useGetAllRemastersByUserIdInfinite(
    user?.data.id ?? "no-id",
    { limit: defaultPaginationLimit },
    {
      query: {
        enabled: !fetchingUser && !!user,
        getNextPageParam: (page) => page.data.next,
      },
    },
  );

  const remasters = useMemo(() => {
    return remasterPages?.pages.flatMap((page) => page.data.items);
  }, [remasterPages]);

  if (fetchingUser || fetchingRemasters) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Remaster - {router.query.username as string}</title>
      </Head>
      <main className="flex flex-1 flex-col-reverse justify-start gap-2 md:flex-row">
        <InfinitePagination
          lastItem={lastItem}
          onLastItem={() => void fetchNextPage()}
          loading={fetchingRemasters}
          className="flex-1"
        >
          {remasters && remasters.length > 0 ? (
            <div className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
            !fetchingRemasters && (
              <NoData>No remasters have been made :(</NoData>
            )
          )}
        </InfinitePagination>
        <UserLayout user={user?.data} remasterCount={1} />
      </main>
    </>
  );
};

export default User;
