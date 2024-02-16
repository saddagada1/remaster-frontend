import { useSearchRemastersInfinite } from "@/api/remaster-controller/remaster-controller";
import { useSearchUsersInfinite } from "@/api/user-controller/user-controller";
import InfinitePagination from "@/components/infinitePagination";
import { SimpleLoading } from "@/components/loading";
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
      <main className="flex-1">
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
          className="flex h-full flex-col"
        >
          <TabsList className="p-2">
            <TabsTrigger className="mono flex-1" value="remasters">
              Remasters
            </TabsTrigger>
            <TabsTrigger className="mono flex-1" value="users">
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="remasters" className="flex-1">
            {remasters && remasters.length > 0 ? (
              <InfinitePagination
                lastItem={lastRemaster}
                onLastItem={() => void fetchMoreRemasters()}
                loading={fetchingRemasters}
                className="flex-1"
              >
                <div className="search-remaster-grid">
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
              </InfinitePagination>
            ) : !fetchingRemasters ? (
              <NoData />
            ) : (
              <div className="flex-1">
                <SimpleLoading />
              </div>
            )}
          </TabsContent>
          <TabsContent value="users" className="flex-1">
            {users && users.length > 0 ? (
              <InfinitePagination
                lastItem={lastUser}
                onLastItem={() => void fetchMoreUsers()}
                loading={fetchingUsers}
                className="flex-1"
              >
                <div className="search-user-grid">
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
              </InfinitePagination>
            ) : !fetchingUsers ? (
              <NoData />
            ) : (
              <div className="flex-1">
                <SimpleLoading />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Search;
