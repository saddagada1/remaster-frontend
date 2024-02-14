import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonLoading, Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, type HTMLAttributes } from "react";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z
  .object({
    image: z.string().optional(),
    username: z
      .string()
      .min(4, { message: "Min 4 Chars Required" })
      .regex(/^[A-Za-z0-9_]*$/, "Only A-Z, 0-9 & _")
      .max(15, { message: "Max 15 Chars Allowed" }),
    email: z.string().email({ message: "Invalid Email" }),
    name: z.string().max(25, { message: "Max 25 Chars" }).optional(),
    bio: z.string().max(500).optional(),
    password: z.string().min(8, { message: "Min 8 Chars Required" }).optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Does Not Match",
    path: ["confirmPassword"],
  });

interface SettingsFormProps extends HTMLAttributes<HTMLDivElement> {
  onFormSubmit: (
    values: z.infer<typeof formSchema> & { profileImageFile: File | null },
  ) => void | Promise<void>;
  buttonLabel: string;
  defaultValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  onFormSubmit,
  buttonLabel,
  defaultValues,
  children,
  ...props
}) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleProfileImageUpload = (file?: File) => {
    const accept = "image/jpeg image/jpg image/png";
    if (!file) return;
    if (file.size > 2097152) {
      toast.error("Max File Size: 2MB");
      return;
    }
    if (!accept.includes(file.type)) {
      toast.error("Only JPEG, JPG and PNG Files");
      return;
    }
    setProfileImageFile(file);
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-[600px] px-2 text-right md:px-0"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((values) => {
          void onFormSubmit({ ...values, profileImageFile });
        })}
      >
        <div {...props}>
          <div className="space-y-8 lg:w-1/2">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-full border border-input">
              <input
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                type="file"
                name="file"
                placeholder=""
                onChange={(e) =>
                  e.target.files && handleProfileImageUpload(e.target.files[0])
                }
              />
              {!form.getValues().image && !profileImageFile ? (
                <p className="mono p-accent">Profile Picture</p>
              ) : (
                <>
                  <Image
                    src={
                      !!profileImageFile
                        ? URL.createObjectURL(profileImageFile)
                        : form.getValues().image ?? ""
                    }
                    alt="Profile picture preview"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    className="absolute bottom-4 bg-destructive/50"
                    onClick={() => {
                      if (profileImageFile) {
                        setProfileImageFile(null);
                      } else {
                        form.setValue("image", undefined);
                      }
                    }}
                  >
                    Clear
                  </Button>
                </>
              )}
            </div>
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
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
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
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8 lg:w-1/2">
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>Bio</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Bio"
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
          </div>
        </div>
        <div className="flex gap-2">
          {children}
          {form.formState.isSubmitting ? (
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

export default SettingsForm;
