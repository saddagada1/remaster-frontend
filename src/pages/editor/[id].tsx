import { useGetUserRemaster } from "@/api/remaster-controller/remaster-controller";
import Loading from "@/components/loading";
import AudioTimeline from "@/components/remasters/audioTimeline";
import LoopTimeline from "@/components/remasters/loopTimeline";
import { mode, pitchClass, timeSignature, tuning } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { initRemaster } from "@/lib/redux/slices/remasterSlice";
import { handleApiError } from "@/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useElementSize } from "usehooks-ts";

const Editor: NextPage = ({}) => {
  const [container, { width }] = useElementSize();
  const router = useRouter();
  const state = useAppSelector((state) => state.remaster);
  const dispatch = useAppDispatch();
  const {
    data: remaster,
    isLoading,
    error,
  } = useGetUserRemaster(router.query.id as string, {
    query: {
      enabled: typeof router.query.id === "string",
    },
  });
  const player = useRef<ReactPlayer>(null!);

  const seek = (position: number) => {
    player.current.seekTo(position, "seconds");
  };

  useEffect(() => {
    if (isLoading || state.metadata !== null) return;

    if (!remaster || error) {
      handleApiError(error);
      return;
    }

    dispatch(
      initRemaster({
        seek: seek,
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
        },
      }),
    );
  }, [remaster]);

  if (isLoading || state.metadata === null) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Remaster - Editor</title>
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
        <div className="flex flex-1 gap-2">
          <div className="flex w-1/3 flex-col gap-2">
            <div className="aspect-video w-full overflow-hidden rounded-md border border-input">
              <ReactPlayer
                ref={player}
                url={state.metadata.url}
                width="100%"
                height="100%"
              />
            </div>
            <div className="section flex-1"></div>
          </div>
          <div className="section flex-1"></div>
        </div>
        <div className="section">
          <LoopTimeline width={width} duration={state.metadata.duration} />
        </div>
        <div className="section flex flex-col gap-2">
          <AudioTimeline width={width} duration={state.metadata.duration} />
        </div>
      </main>
    </>
  );
};
export default Editor;
