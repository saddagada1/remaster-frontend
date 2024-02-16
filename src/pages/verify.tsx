import { useVerifyEmail } from "@/api/authentication-controller/authentication-controller";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setVerified } from "@/lib/redux/slices/authSlice";
import { handleApiError } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Verify: NextPage = ({}) => {
  const router = useRouter();
  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();
  const [status, setStatus] = useState("Verifying...Please Wait");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (!router.query.token || typeof router.query.token != "string") return;
      try {
        await verifyEmail({ params: { token: router.query.token } });
        setStatus("Success! Redirecting Now.");
        toast.success("Your Account is now Verified!");
        dispatch(setVerified(true));
        await router.push("/");
      } catch (error) {
        handleApiError(error);
        setStatus("Could Not Verify Email. Please Try Again.");
      }
    };

    void handleVerifyEmail();
  }, [router.query.token]);

  return (
    <>
      <Head>
        <title>Remaster - Verify Account</title>
      </Head>
      <main className="section flex flex-1 items-center justify-center">
        <p className="p mono my-8 flex w-full items-center justify-center">
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {status}
        </p>
      </main>
    </>
  );
};
export default Verify;
