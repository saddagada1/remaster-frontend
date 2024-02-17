import { useGetRecentRemastersInfinite } from "@/api/remaster-controller/remaster-controller";
import InfinitePagination from "@/components/infinitePagination";
import { SimpleLoading } from "@/components/loading";
import Marquee from "@/components/marquee";
import NoData from "@/components/noData";
import RemasterCard from "@/components/remasters/remasterCard";
import { defaultPaginationLimit } from "@/lib/constants";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useRef } from "react";

const Recent: NextPage = ({}) => {
  const lastItem = useRef<HTMLDivElement>(null!);
  const {
    data: remasterPages,
    isLoading,
    fetchNextPage,
  } = useGetRecentRemastersInfinite(
    { limit: defaultPaginationLimit },
    {
      query: {
        queryKey: ["recent-page"],
        getNextPageParam: (page) => page.data.next,
      },
    },
  );

  const remasters = useMemo(() => {
    return remasterPages?.pages.flatMap((page) => page.data.items);
  }, [remasterPages]);

  return (
    <>
      <Head>
        <title>Remaster - Recent</title>
      </Head>
      <main className="flex flex-1 flex-col gap-2">
        <Marquee>Recent</Marquee>
        {!!remasters && remasters.length > 0 ? (
          <InfinitePagination
            lastItem={lastItem}
            onLastItem={() => void fetchNextPage()}
            loading={isLoading}
            className="flex-1"
          >
            <div className="default-remaster-grid">
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
        ) : !isLoading ? (
          <NoData className="section h-full">
            No remasters have been made :(
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

export default Recent;
