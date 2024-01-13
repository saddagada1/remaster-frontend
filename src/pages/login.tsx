import type { NextPage } from "next";
import Head from "next/head";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { ButtonLoading, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@/api/authentication-controller/authentication-controller";
import { checkIfApiError, trimmedString } from "@/lib/utils";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAuthState } from "@/lib/redux/slices/authSlice";

const formSchema = z.object({
  emailOrUsername: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync: login } = useLoginUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login({
        data: {
          principal: trimmedString(values.emailOrUsername),
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
      void router.push("/");
    } catch (error) {
      const apiError = checkIfApiError(error);
      if (!!apiError) {
        form.setError(apiError.subject as "emailOrUsername", {
          message: apiError.message,
        });
      }
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 w-full max-w-[400px] px-2 text-right hr:px-0"
      >
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem className="mb-8">
              <div className="flex justify-between">
                <FormLabel>Email or Username</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="sloopy@acme.ca" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
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
        <Button
          variant="link"
          className="mono mb-8 h-fit p-0 text-xs font-normal hr:text-sm"
          asChild
        >
          <Link href="/forgot-password">Forgot Password?</Link>
        </Button>
        {form.formState.isSubmitting ? (
          <ButtonLoading className="text-sm" size="lg" />
        ) : (
          <Button className="text-sm" size="lg" type="submit">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};

const Login: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>Remaster - Login</title>
      </Head>
      <main className="section flex h-full flex-col items-center justify-center">
        <h1 className="title mono mb-8 w-full max-w-[400px] pl-2 hr:pl-0">
          Login
        </h1>
        <LoginForm />
        <Button
          variant="link"
          className="mono h-fit p-0 text-xs font-normal hr:text-sm"
          asChild
        >
          <Link href="/sign-up">Don&apos;t have an account? Sign Up!</Link>
        </Button>
      </main>
    </>
  );
};

export default Login;
