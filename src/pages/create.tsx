import { useCreateRemaster } from "@/api/remaster-controller/remaster-controller";
import RemasterForm from "@/components/remasters/remasterForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleApiError } from "@/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useElementSize } from "usehooks-ts";

const Create: NextPage = ({}) => {
  const [container, { height }] = useElementSize();
  const { mutateAsync: createRemaster } = useCreateRemaster();
  const router = useRouter();
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
              defaultValues={{
                key: 0,
                mode: 0,
                tempo: 80.0,
                timeSignature: 3,
                tuning: 0,
                url: "",
                name: "",
                description: "",
              }}
              onFormSubmit={async (values) => {
                try {
                  const remaster = await createRemaster({ data: values });
                  void router.replace(`/editor/${remaster.data.id}`);
                } catch (error) {
                  handleApiError(error);
                }
              }}
            />
          </main>
        </ScrollArea>
      </div>
    </>
  );
};

export default Create;
