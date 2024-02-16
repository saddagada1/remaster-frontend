import { useChangeForgottenPassword } from "@/api/authentication-controller/authentication-controller";
import { ButtonLoading, Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAuthState } from "@/lib/redux/slices/authSlice";
import { handleApiError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(8, { message: "Min 8 Chars Required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Does Not Match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync: resetPassword } = useChangeForgottenPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!router.query.token || typeof router.query.token !== "string") {
      toast.error("No token provided. Please try again.");
      return;
    }
    try {
      const response = await resetPassword({
        params: {
          token: router.query.token,
          password: values.password,
        },
      });
      dispatch(
        setAuthState({
          status: "authenticated",
          credentials: {
            accessToken: response.data.accessToken,
            expiresAt: Date.parse(response.data.expiresAt),
            user: response.data.user,
          },
        }),
      );
      toast.success("Success! Your password has been reset.");
      await router.push("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[400px] space-y-8 px-2 text-right hr:px-0"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Confirm Password</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isSubmitting ? (
          <ButtonLoading className="text-sm" size="lg" />
        ) : (
          <Button className="text-sm" size="lg" type="submit">
            Reset
          </Button>
        )}
      </form>
    </Form>
  );
};

const ResetPassword: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>Remaster - Reset Password</title>
      </Head>
      <main className="section flex h-full flex-col items-center justify-center">
        <h1 className="title mono mb-8 w-full max-w-[400px] pl-2 hr:pl-0">
          Reset Password
        </h1>
        <ResetPasswordForm />
      </main>
    </>
  );
};
export default ResetPassword;
