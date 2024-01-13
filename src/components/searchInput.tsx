import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { type FormHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchInputProps = FormHTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  query: z.string(),
});

const SearchInput: React.FC<SearchInputProps> = ({ ...FormHTMLAtrributes }) => {
  const router = useRouter();
  const { className, ...props } = FormHTMLAtrributes;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/search?q=${values.query}`);
  };

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={cn(className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="section flex h-full items-center space-y-0 hr:h-14">
              <FormControl>
                <>
                  <div className="flex items-center justify-center pl-2">
                    <MagnifyingGlassIcon className="h-5 w-5 hr:h-6 hr:w-6" />
                  </div>
                  <Input
                    placeholder="Search for something...anything"
                    className="mono h-full rounded-none border-0 text-xs shadow-none focus-visible:ring-0 hr:text-sm"
                    autoComplete="off"
                    {...field}
                  />
                </>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default SearchInput;
