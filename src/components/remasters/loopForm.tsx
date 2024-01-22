import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { pitchClass, mode } from "@/lib/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";

const formSchema = z.object({
  key: z.number().min(0).max(11),
  mode: z.number().min(0).max(1),
});

interface LoopFormProps {
  onFormSubmit: (values: z.infer<typeof formSchema>) => void | Promise<void>;
  buttonLabel: string;
  defaultValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
}

const LoopForm: React.FC<LoopFormProps> = ({
  onFormSubmit,
  buttonLabel,
  defaultValues,
  children,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className="space-y-8"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Key</FormLabel>
                <FormMessage />
              </div>
              <Select
                onValueChange={(value) => {
                  field.onChange(parseInt(value));
                }}
                defaultValue={
                  !!defaultValues ? field.value.toString() : undefined
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a key" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(pitchClass).map((key, index) => (
                    <SelectItem key={index} value={key}>
                      {pitchClass[parseInt(key)]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Mode</FormLabel>
                <FormMessage />
              </div>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={
                  !!defaultValues ? field.value.toString() : undefined
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(mode).map((key, index) => (
                    <SelectItem key={index} value={key}>
                      {mode[parseInt(key)]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button size="lg" type="submit">
            {buttonLabel}
          </Button>
          {children}
        </div>
      </form>
    </Form>
  );
};
export default LoopForm;
