import { useUpdateUser } from "@/api/user-controller/user-controller";
import SettingsForm from "@/components/settingsForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/authSlice";
import { handleApiError } from "@/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "sonner";
import { useElementSize } from "usehooks-ts";

const Settings: NextPage = ({}) => {
  const [container, { height }] = useElementSize();
  const user = useAppSelector((state) => state.auth.credentials?.user);
  const dispatch = useAppDispatch();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  return (
    <>
      <Head>
        <title>Remaster - Settings</title>
      </Head>
      <div className="section h-full">
        <ScrollArea ref={container} className="h-full">
          <main
            style={{ minHeight: height }}
            className="flex flex-col items-center pb-8 md:justify-center lg:pb-0"
          >
            <h1 className="title mono my-8 w-full max-w-[600px] pl-2 hr:pl-0">
              Account Settings
            </h1>
            <SettingsForm
              className="mb-8 flex flex-col gap-8 lg:flex-row"
              buttonLabel="Save"
              defaultValues={
                user
                  ? {
                      image: user.image ?? undefined,
                      username: user.username,
                      email: user.email,
                      name: user.name ?? undefined,
                      bio: user.bio ?? undefined,
                      password: undefined,
                      confirmPassword: undefined,
                    }
                  : undefined
              }
              onFormSubmit={async ({ profileImageFile, ...values }) => {
                try {
                  const response = await updateUser({
                    data: { request: values, imageFile: profileImageFile },
                  });
                  dispatch(setUser({ user: response.data.user }));
                  toast.success("Success");
                } catch (error) {
                  handleApiError(error);
                }
              }}
              isSubmitting={isPending}
            />
          </main>
        </ScrollArea>
      </div>
    </>
  );
};
export default Settings;
