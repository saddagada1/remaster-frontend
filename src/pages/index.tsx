import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

const heroSections = [
  { url: "/media/hero-1.jpg", alt: "hero-1", title: "Practice" },
  { url: "/media/hero-2.jpg", alt: "hero-2", title: "Learn" },
  { url: "/media/hero-3.jpg", alt: "hero-3", title: "Grow" },
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Remaster</title>
      </Head>
      <main className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="section relative flex-1 overflow-hidden">
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
          <div className="relative aspect-video w-2/5 overflow-hidden rounded-md border border-input">
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
                View
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 gap-2">
          <div className="section flex-1">
            <p className="label">New</p>
          </div>
          <div className="section flex-1">
            <p className="label">Trending</p>
          </div>
          <div className="section flex-1">
            <p className="label">Favourites</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
