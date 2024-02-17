import {
  useGetFavouriteRemasters,
  useGetRecentRemasters,
  useGetTrendingRemasters,
} from "@/api/remaster-controller/remaster-controller";
import { SimpleLoading } from "@/components/loading";
import NoData from "@/components/noData";
import RemasterCard from "@/components/remasters/remasterCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultPaginationLimit } from "@/lib/constants";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useElementSize } from "usehooks-ts";

const Home: NextPage = () => {
  const { data: recent, isLoading: fetchingRecent } = useGetRecentRemasters({
    limit: defaultPaginationLimit,
  });
  const { data: trending, isLoading: fetchingTrending } =
    useGetTrendingRemasters({ limit: defaultPaginationLimit });
  const { data: favourites, isLoading: fetchingFavourites } =
    useGetFavouriteRemasters({ limit: defaultPaginationLimit });
  const [container, { height }] = useElementSize();

  return (
    <>
      <Head>
        <title>Remaster</title>
      </Head>
      <main className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="section relative aspect-video flex-1 overflow-hidden md:aspect-auto">
            <video
              src="/media/hero.mp4"
              autoPlay
              muted
              loop
              className="absolute left-0 top-0"
            />
            <div className="absolute bottom-2 right-4">
              <p className="p mono text-muted-foreground">
                Play | Learn | Grow
              </p>
              <h1 className="h1 mono text-right text-white">
                Welcome to Remaster
              </h1>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-md border border-input md:w-2/5">
            <ReactPlayer
              url={
                "https://www.youtube.com/watch?v=hHHY3eRUMsM&ab_channel=feedbackbro"
              }
              width="100%"
              height="100%"
              light
            />
            <div className="absolute top-0 h-full w-full bg-gradient-to-b from-black via-transparent to-black" />
            <div className="absolute left-4 top-4">
              <p className="p mono text-muted-foreground">
                Featured - Jeff Beck
              </p>
              <h1 className="h1 mono text-white">A Day In The Life</h1>
            </div>
            <Button className="absolute bottom-4 right-4" asChild>
              <Link
                href={`/create?url=${"https://www.youtube.com/watch?v=hHHY3eRUMsM&ab_channel=feedbackbro"}`}
              >
                Create
              </Link>
            </Button>
          </div>
        </div>
        <div ref={container} className="flex flex-1 gap-2">
          <div
            style={{ height }}
            className="section hidden min-h-[300px] flex-1 flex-col gap-2 xl:flex"
          >
            <div className="flex justify-between">
              <p className="label">Recent</p>
              <Button variant="outline" asChild>
                <Link href="/recent">View All</Link>
              </Button>
            </div>
            {!!recent && recent.data.items.length > 0 ? (
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  {recent.data.items.map((remaster, i) => (
                    <RemasterCard key={i} remaster={remaster} />
                  ))}
                </div>
              </ScrollArea>
            ) : !fetchingRecent ? (
              <NoData className="h-full">No remasters have been made :(</NoData>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <SimpleLoading />
              </div>
            )}
          </div>
          <div
            style={{ height }}
            className="section flex min-h-[300px] flex-1 flex-col gap-2"
          >
            <div className="flex justify-between">
              <p className="label">Trending</p>
              <Button variant="outline" asChild>
                <Link href="/trending">View All</Link>
              </Button>
            </div>
            {!!trending && trending.data.items.length > 0 ? (
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  {trending.data.items.map((remaster, i) => (
                    <RemasterCard key={i} remaster={remaster} />
                  ))}
                </div>
              </ScrollArea>
            ) : !fetchingTrending ? (
              <NoData className="h-full">No remasters have been made :(</NoData>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <SimpleLoading />
              </div>
            )}
          </div>
          <div
            style={{ height }}
            className="section hidden min-h-[300px] flex-1 flex-col gap-2 md:flex"
          >
            <div className="flex justify-between">
              <p className="label">Favourites</p>
              <Button variant="outline" asChild>
                <Link href="/favourites">View All</Link>
              </Button>
            </div>
            {!!favourites && favourites.data.items.length > 0 ? (
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  {favourites.data.items.map((remaster, i) => (
                    <RemasterCard key={i} remaster={remaster} />
                  ))}
                </div>
              </ScrollArea>
            ) : !fetchingFavourites ? (
              <NoData className="h-full">No remasters have been made :(</NoData>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <SimpleLoading />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
