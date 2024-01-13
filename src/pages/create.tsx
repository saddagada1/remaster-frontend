import RemasterForm from "@/components/remasters/remasterForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NextPage } from "next";
import Head from "next/head";
import { useElementSize } from "usehooks-ts";

const Create: NextPage = ({}) => {
  const [container, { height }] = useElementSize();
  return (
    <>
      <Head>
        <title>Remaster - Create</title>
      </Head>
      <div className="section h-full">
        <ScrollArea ref={container} className="h-full">
          <main
            style={{ minHeight: height }}
            className="flex flex-col items-center hr:justify-center"
          >
            <h1 className="title mono my-8 w-full max-w-[600px] pl-2 hr:pl-0">
              Create
            </h1>
            <RemasterForm
              className="mb-8 flex flex-col gap-8 lg:flex-row"
              buttonLabel="Create Remaster"
              onFormSubmit={() => {
                console.log("sub");
              }}
            />
          </main>
        </ScrollArea>
      </div>
    </>
  );
};

export default Create;
