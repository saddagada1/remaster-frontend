import type { NextPage } from "next";
import Head from "next/head";
import Loading from "@/components/loading";
import UserLayout from "@/components/userLayout";
import RemasterCard from "@/components/remasters/remasterCard";
import { useGetUserByUsername } from "@/api/user-controller/user-controller";
import { useRouter } from "next/router";
import { useGetAllRemastersByUserIdInfinite } from "@/api/remaster-controller/remaster-controller";
import { useMemo } from "react";
import { defaultPaginationLimit } from "@/lib/constants";

const User: NextPage = ({}) => {
  //   const lastItem = useRef<HTMLButtonElement>(null!);
  const router = useRouter();
  const { data: user, isLoading: fetchingUser } = useGetUserByUsername(
    router.query.username as string,
    {
      query: {
        enabled: typeof router.query.username === "string",
      },
    },
  );
  const { data: remasterPages, isLoading: fetchingRemasters } =
    useGetAllRemastersByUserIdInfinite(
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
      <main className="flex flex-1 flex-col-reverse justify-start gap-2 hr:flex-row">
        <div className="grid h-fit flex-1 grid-flow-row gap-2 hr:grid-cols-4">
          {remasters?.map((remaster, index) => (
            <RemasterCard key={index} remaster={remaster} />
          ))}
        </div>
        <UserLayout user={user?.data} remasterCount={1} />
      </main>
    </>
  );
};

export default User;
