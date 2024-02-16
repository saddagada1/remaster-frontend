import { useSendForgotPasswordEmail } from "@/api/authentication-controller/authentication-controller";
import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});

const ForgotPasswordForm: React.FC = () => {
  const { mutateAsync: sendEmail } = useSendForgotPasswordEmail();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendEmail({
        params: {
          email: values.email,
        },
      });
      toast.success("Success! Check your email.");
    } catch (error) {
      handleApiError(error);
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
          name="email"
          render={({ field }) => (
            <FormItem className="mb-8">
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
        {form.formState.isSubmitting ? (
          <ButtonLoading className="text-sm" size="lg" />
        ) : (
          <Button className="text-sm" size="lg" type="submit">
            Send Email
          </Button>
        )}
      </form>
    </Form>
  );
};

const ForgotPassword: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>Remaster - Forgot Password</title>
      </Head>
      <main className="section flex h-full flex-col items-center justify-center">
        <h1 className="title mono mb-8 w-full max-w-[400px] pl-2 hr:pl-0">
          Forgot Password
        </h1>
        <ForgotPasswordForm />
        <Button
          variant="link"
          className="mono h-fit p-0 text-xs font-normal hr:text-sm"
          asChild
        >
          <Link href="/login">Memory restored? Login!</Link>
        </Button>
      </main>
    </>
  );
};
export default ForgotPassword;
