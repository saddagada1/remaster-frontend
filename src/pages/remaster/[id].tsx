import {
  useCreateOrUpdateRemasterPlays,
  useGetRemaster,
} from "@/api/remaster-controller/remaster-controller";
import Loading from "@/components/loading";
import AudioTimeline from "@/components/remasters/audioTimeline";
import LoopTimeline from "@/components/remasters/loopTimeline";
import LoopView from "@/components/remasters/loopView";
import CompositionView from "@/components/remasters/compositionView";
import { mode, pitchClass, timeSignature, tuning } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  handlePlayingLoop,
  incrementTotalPlays,
  initRemaster,
  setIsPlaying,
  setPlaybackPosition,
} from "@/lib/redux/slices/remasterSlice";
import { handleApiError } from "@/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useElementSize } from "usehooks-ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Loop } from "@/lib/types";

const Remaster: NextPage = ({}) => {
  const [container, { width }] = useElementSize();
  const router = useRouter();
  const state = useAppSelector((state) => state.remaster);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { mutateAsync: updatePlay, isSuccess } =
    useCreateOrUpdateRemasterPlays();
  const {
    data: remaster,
    isLoading,
    isRefetching,
    error,
  } = useGetRemaster(
    router.query.id as string,
    { userId: auth.credentials?.user.id },
    {
      query: {
        enabled: typeof router.query.id === "string",
      },
    },
  );
  const player = useRef<ReactPlayer>(null!);

  const seek = (position: number) => {
    player.current.seekTo(position, "seconds");
  };

  useEffect(() => {
    if (
      !remaster ||
      isLoading ||
      isRefetching ||
      (state.metadata !== null && state.metadata.id === remaster?.data.id)
    )
      return;

    if (error) {
      handleApiError(error);
      return;
    }

    dispatch(
      initRemaster({
        loops:
          remaster.data.loops === null
            ? []
            : (JSON.parse(remaster.data.loops) as Loop[]),
        metadata: {
          id: remaster.data.id,
          url: remaster.data.url,
          name: remaster.data.name,
          description: remaster.data.description,
          duration: remaster.data.duration,
          key: remaster.data.key,
          mode: remaster.data.mode,
          tempo: remaster.data.tempo,
          timeSignature: remaster.data.timeSignature,
          tuning: remaster.data.tuning,
          userId: remaster.data.user.id,
          totalPlays: remaster.data.totalPlays,
          totalLikes: remaster.data.totalLikes,
        },
        likedBySessionUser: !!remaster.data.likedBySessionUser,
      }),
    );
  }, [remaster]);

  useEffect(() => {
    if (state.metadata === null || isSuccess) return;

    const handleCreateOrUpdatePlay = async () => {
      if (state.metadata === null || isSuccess) return;
      try {
        await updatePlay({
          params: { id: state.metadata.id, userId: auth.credentials?.user.id },
        });
        dispatch(incrementTotalPlays());
      } catch (error) {
        return;
      }
    };

    const timeout = setTimeout(() => {
      void handleCreateOrUpdatePlay();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state.metadata]);

  if (isLoading || state.metadata === null) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Remaster - {state.metadata.name}</title>
      </Head>
      <main
        ref={container}
        className="flex h-full flex-col gap-2 overflow-hidden"
      >
        <header className="flex gap-2">
          <div className="section flex-1">
            <h1 className="label">Key</h1>
            <p className="p">{`${pitchClass[state.metadata.key]} ${
              mode[state.metadata.mode]
            }`}</p>
          </div>
          <div className="section flex-1">
            <h1 className="label">Tempo</h1>
            <p className="p">{`${Math.round(state.metadata.tempo)} BPM`}</p>
          </div>
          <div className="section flex-1">
            <h1 className="label">Time</h1>
            <p className="p">{timeSignature[state.metadata.timeSignature]}</p>
          </div>
          <div className="section flex-1">
            <h1 className="label">Tuning</h1>
            <p className="p">{tuning[state.metadata.tuning]?.name}</p>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 hr:flex-row">
          <div className="flex flex-col gap-2 md:flex-row hr:w-1/3 hr:flex-col">
            <div className="aspect-video w-full overflow-hidden rounded-md border border-input">
              <ReactPlayer
                ref={player}
                url={state.metadata.url}
                progressInterval={1}
                onProgress={({ playedSeconds }) => {
                  if (!state.isScrubbing && state.isPlaying) {
                    dispatch(setPlaybackPosition(playedSeconds));
                  }
                  dispatch(handlePlayingLoop({ position: playedSeconds }));

                  if (!state.playingLoop) return;

                  const loopOutOfPosition = !!(
                    state.playingLoop.start > playedSeconds ||
                    playedSeconds > state.playingLoop.end
                  );

                  if (state.repeatPlayingLoop && loopOutOfPosition) {
                    seek(state.playingLoop.start);
                    dispatch(setPlaybackPosition(state.playingLoop.start));
                  }
                }}
                onPlay={() => dispatch(setIsPlaying(true))}
                onPause={() => dispatch(setIsPlaying(false))}
                onEnded={() => {
                  dispatch(setIsPlaying(false));
                  dispatch(setPlaybackPosition(0));
                }}
                volume={state.volume}
                playing={state.isPlaying}
                controls={false}
                width="100%"
                height="100%"
              />
            </div>
            <LoopView
              disabled
              seek={seek}
              className="hidden min-w-[25%] flex-1 md:flex"
            />
          </div>
          <CompositionView disabled className="hidden flex-1 md:flex" />
          <Tabs defaultValue="loops" className="flex flex-1 flex-col md:hidden">
            <TabsList>
              <TabsTrigger className="mono flex-1" value="loops">
                Loops
              </TabsTrigger>
              <TabsTrigger className="mono flex-1" value="tabs">
                Composition
              </TabsTrigger>
            </TabsList>
            <TabsContent value="loops" className="flex-1">
              <LoopView disabled seek={seek} className="h-full" />
            </TabsContent>
            <TabsContent value="tabs" className="flex-1">
              <CompositionView disabled className="h-full" />
            </TabsContent>
          </Tabs>
        </div>
        <div className="section">
          <LoopTimeline
            seek={seek}
            width={width}
            duration={state.metadata.duration}
            disabled
          />
        </div>
        <div className="section flex flex-col gap-2">
          <AudioTimeline
            seek={seek}
            width={width}
            duration={state.metadata.duration}
          />
        </div>
      </main>
    </>
  );
};
export default Remaster;
