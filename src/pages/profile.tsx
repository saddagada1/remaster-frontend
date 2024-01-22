import type { NextPage } from "next";
import Head from "next/head";
import {
  useGetAllUserRemasters,
  useGetAllUserRemastersInfinite,
} from "@/api/remaster-controller/remaster-controller";
import Loading from "@/components/loading";
import { useAppSelector } from "@/lib/redux/hooks";
import UserLayout from "@/components/userLayout";
import RemasterCard from "@/components/remasters/remasterCard";
import { useMemo } from "react";
import { defaultPaginationLimit } from "@/lib/constants";

const Profile: NextPage = ({}) => {
  // const lastItem = useRef<HTMLButtonElement>(null!);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Remaster - Profile</title>
      </Head>
      <main className="flex flex-1 flex-col-reverse justify-start gap-2 hr:flex-row">
        <div className="grid h-fit flex-1 grid-flow-row gap-2 hr:grid-cols-4">
          {remasters?.map((remaster, index) => (
            <RemasterCard key={index} remaster={remaster} />
          ))}
          <h1 onClick={() => fetchNextPage()}>load</h1>
        </div>
        <UserLayout user={user} remasterCount={1} />
      </main>
    </>
  );
};

export default Profile;
