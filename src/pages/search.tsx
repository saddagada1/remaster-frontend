import { useSearchRemastersInfinite } from "@/api/remaster-controller/remaster-controller";
import { useSearchUsersInfinite } from "@/api/user-controller/user-controller";
import InfinitePagination from "@/components/infinitePagination";
import NoData from "@/components/noData";
import RemasterCard from "@/components/remasters/remasterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/userCard";
import { defaultPaginationLimit } from "@/lib/constants";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useRef } from "react";

const Search: NextPage = ({}) => {
  const router = useRouter();
  const lastUser = useRef<HTMLDivElement>(null!);
  const lastRemaster = useRef<HTMLDivElement>(null!);
  const {
    data: userPages,
    isLoading: fetchingUsers,
    fetchNextPage: fetchMoreUsers,
  } = useSearchUsersInfinite(
    { q: router.query.q as string, limit: defaultPaginationLimit },
    {
      query: {
        getNextPageParam: (page) => page.data.next,
        enabled:
          typeof router.query.q === "string" && router.query.type === "users",
      },
    },
  );
  const {
    data: remasterPages,
    isLoading: fetchingRemasters,
    fetchNextPage: fetchMoreRemasters,
  } = useSearchRemastersInfinite(
    { q: router.query.q as string, limit: defaultPaginationLimit },
    {
      query: {
        getNextPageParam: (page) => page.data.next,
        enabled:
          typeof router.query.q === "string" &&
          router.query.type === "remasters",
      },
    },
  );

  const users = useMemo(() => {
    return userPages?.pages.flatMap((page) => page.data.items);
  }, [userPages]);

  const remasters = useMemo(() => {
    return remasterPages?.pages.flatMap((page) => page.data.items);
  }, [remasterPages]);

  return (
    <>
      <Head>
        <title>Remaster - Search</title>
      </Head>
      <main className="flex flex-1 flex-col justify-start gap-2">
        <Tabs
          key={router.query.type as string}
          defaultValue={router.query.type as string}
          onValueChange={(v) =>
            router.replace(
              `/search?q=${router.query.q as string}&type=${v}`,
              undefined,
              { shallow: true },
            )
          }
          className="flex flex-1 flex-col"
        >
          <TabsList>
            <TabsTrigger className="mono flex-1" value="remasters">
              Remasters
            </TabsTrigger>
            <TabsTrigger className="mono flex-1" value="users">
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="remasters" className="flex-1">
            <InfinitePagination
              lastItem={lastRemaster}
              onLastItem={() => void fetchMoreRemasters()}
              loading={fetchingRemasters}
              className="flex-1"
            >
              {remasters && remasters.length > 0 ? (
                <div className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {remasters?.map((remaster, index) => (
                    <RemasterCard
                      ref={
                        index === (remasters?.length ?? 0) - 1
                          ? lastRemaster
                          : undefined
                      }
                      key={index}
                      remaster={remaster}
                    />
                  ))}
                </div>
              ) : (
                !fetchingRemasters && <NoData />
              )}
            </InfinitePagination>
          </TabsContent>
          <TabsContent value="users" className="flex-1">
            <InfinitePagination
              lastItem={lastUser}
              onLastItem={() => void fetchMoreUsers()}
              loading={fetchingUsers}
              className="flex-1"
            >
              {users && users.length > 0 ? (
                <div className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {users?.map((user, index) => (
                    <UserCard
                      ref={
                        index === (users?.length ?? 0) - 1
                          ? lastUser
                          : undefined
                      }
                      key={index}
                      user={user}
                    />
                  ))}
                </div>
              ) : (
                !fetchingUsers && <NoData />
              )}
            </InfinitePagination>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Search;
