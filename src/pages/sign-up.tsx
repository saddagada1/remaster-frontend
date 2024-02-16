import type { NextPage } from "next";
import Head from "next/head";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, ButtonLoading } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { checkIfApiError, handleApiError, trimmedString } from "@/lib/utils";
import { useRegisterUser } from "@/api/authentication-controller/authentication-controller";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAuthState } from "@/lib/redux/slices/authSlice";
import { useElementSize } from "usehooks-ts";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    username: z
      .string()
      .min(4, { message: "Min 4 Chars Required" })
      .regex(/^[A-Za-z0-9_]*$/, "Only A-Z, 0-9 & _")
      .max(15, { message: "Max 15 Chars Allowed" }),
    password: z.string().min(8, { message: "Min 8 Chars Required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Does Not Match",
    path: ["confirmPassword"],
  });

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync: register } = useRegisterUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await register({
        data: {
          email: trimmedString(values.email),
          username: trimmedString(values.username),
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
      if (!!apiError && typeof apiError !== "number") {
        form.setError(apiError.subject as "email" | "username", {
          message: apiError.message,
        });
        return;
      }
      handleApiError(error, { fatal: true });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 w-full max-w-[400px] space-y-8 px-2 hr:px-0"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Email</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="remaster@acme.ca" {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Username</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
            Sign Up
          </Button>
        )}
      </form>
    </Form>
  );
};

const SignUp: NextPage = ({}) => {
  const [container, { height }] = useElementSize();
  return (
    <>
      <Head>
        <title>Remaster - Sign Up</title>
      </Head>
      <div className="section h-full">
        <ScrollArea ref={container} className="h-full">
          <main
            style={{ minHeight: height }}
            className="flex flex-col items-center justify-center pb-8 lg:pb-0"
          >
            <h1 className="title mono my-8 w-full max-w-[400px] pl-2 hr:pl-0">
              Sign Up
            </h1>
            <SignUpForm />
            <Button
              variant="link"
              className="mono h-fit p-0 text-xs font-normal hr:text-sm"
              asChild
            >
              <Link href="/login">Already have an account? Login!</Link>
            </Button>
          </main>
        </ScrollArea>
      </div>
    </>
  );
};
export default SignUp;
