import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonLoading, Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, type HTMLAttributes } from "react";
import { pitchClass, mode, timeSignature, tuning } from "@/lib/constants";
import ReactPlayer from "react-player";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string().min(1, { message: "Required" }),
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(40, { message: "Max 40 Chars" }),
  description: z.string().max(500).optional(),
  key: z.number().min(0).max(11),
  mode: z.number().min(0).max(1),
  timeSignature: z.number().min(3).max(7),
  tempo: z.number().min(40).max(220),
  tuning: z.number().min(0).max(9),
});

interface RemasterFormProps extends HTMLAttributes<HTMLDivElement> {
  onFormSubmit: (
    values: z.infer<typeof formSchema> & { duration: number },
  ) => void | Promise<void>;
  buttonLabel: string;
  defaultValues?: z.infer<typeof formSchema> & { duration: number };
  isSubmitting?: boolean;
  children?: React.ReactNode;
}

const RemasterForm: React.FC<RemasterFormProps> = ({
  onFormSubmit,
  buttonLabel,
  defaultValues,
  isSubmitting,
  children,
  ...props
}) => {
  const [duration, setDuration] = useState<null | number>(
    defaultValues?.duration ?? null,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className="w-full max-w-[600px] px-2 text-right md:px-0"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((values) => {
          if (!duration) {
            toast.error(
              "could not fetch youtube data. please check the url, refresh and try again",
            );
            return;
          }
          void onFormSubmit({ ...values, duration });
        })}
      >
        <div {...props}>
          <div className="space-y-8 lg:w-1/2">
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md border border-input">
              {!form.getValues().url ? (
                <p className="mono p-accent">Preview</p>
              ) : (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={form.getValues().url}
                  onReady={(player) => setDuration(player.getDuration())}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>URL</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="URL" {...field} />
                  </FormControl>
                  <FormDescription className="w-full text-right text-xs">
                    Youtube, SoundCloud or Vimeo
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>Description</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="w-full text-right text-xs">
                    {`${
                      field.value?.length ? 500 - field.value.length : 500
                    } chars left`}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8 lg:w-1/2">
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
                    onValueChange={(value) => field.onChange(parseInt(value))}
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
            <FormField
              control={form.control}
              name="timeSignature"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Time Signature</FormLabel>
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
                        <SelectValue placeholder="Select a time signature" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(timeSignature).map((key, index) => (
                        <SelectItem key={index} value={key}>
                          {timeSignature[parseInt(key)]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tuning"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Tuning</FormLabel>
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
                        <SelectValue placeholder="Select a tuning" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(tuning).map((key, index) => (
                        <SelectItem key={index} value={key}>
                          {tuning[parseInt(key)]?.name}&nbsp;[
                          {tuning[parseInt(key)]?.notes.join(", ")}]
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Tempo</FormLabel>
                    <FormMessage />
                  </div>
                  <p className="w-full text-right text-sm">
                    {field.value ? Math.round(field.value) : 40}
                  </p>
                  <FormControl>
                    <Slider
                      orientation="horizontal"
                      defaultValue={!!defaultValues ? [field.value] : undefined}
                      onValueChange={(value) => field.onChange(value[0])}
                      min={40}
                      max={220}
                      step={1}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {children}
          {!!isSubmitting ? (
            <ButtonLoading size="lg" />
          ) : (
            <Button type="submit" size="lg">
              {buttonLabel}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RemasterForm;
