"use client";
import { ImageUpload } from "@/components/imgae-upload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { insertAccountsSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

const extendedSchema = insertAccountsSchema.extend({
  email: z.string().email("Invalid email"),
  dateOfBirth: z.string().date().optional(),
  institution: z.string().optional(),
  phoneNumber: z.string().length(11, "Must be 11 digits").optional(),
  photoUrl: z.string().url("Invalid URL").optional(),
  bkash: z.string().optional(),
  bkash_image_url: z.string().url("Invalid URL").optional(),
  nagad: z.string().optional(),
  nagad_image_url: z.string().url("Invalid URL").optional(),
  username: z.string().refine(
    (value) => {
      // Check if the username has no spaces and is URL-safe
      const urlSafePattern = /^[a-zA-Z0-9-_]+$/;
      return urlSafePattern.test(value);
    },
    {
      message: "Username must be URL-safe and contain no spaces",
    },
  ),
});
const formSchema = extendedSchema.pick({
  name: true,
  email: true,
  username: true,
  institution: true,
  phoneNumber: true,
  dateOfBirth: true,
  photoUrl: true,
  about: true,
  bkash: true,
  bkash_image_url: true,
  nagad: true,
  nagad_image_url: true,
  bank_account: true,
  bank_brach: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const CreateAccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const { user } = useUser();
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [debouncedUsername, setDebouncedUsername] = useState<string | null>(
    null,
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    defaultValues?.photoUrl || null,
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [debouncedValue] = useDebounce(debouncedUsername, 500);

  const checkUsernameUnique = async (username: string) => {
    const response = await fetch("/api/check-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    return data.isUnique;
  };

  useEffect(() => {
    if (debouncedValue) {
      checkUsernameUnique(debouncedValue).then((isUnique) => {
        if (!isUnique) {
          setUsernameError("Username is already taken");
        } else {
          setUsernameError(null);
        }
      });
    }
  }, [debouncedValue]);

  const handleSubmit = async (values: FormValues) => {
    const isUnique = await checkUsernameUnique(values.username);
    if (!isUnique) {
      setUsernameError("Username is already taken");
      return;
    }
    setUsernameError(null);
    const formDataWithUserId = { ...values, userId: user?.id };
    onSubmit(formDataWithUserId);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const handleImageUploadSuccess = (url: string) => {
    setPhotoUrl(url);
    form.setValue("photoUrl", url);
    console.log(url);
  };

  const handleBkashImageUploadSuccess = (url: string) => {
    form.setValue("bkash_image_url", url);
  };

  const handleNagadImageUploadSuccess = (url: string) => {
    form.setValue("nagad_image_url", url);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col-reverse md:flex-row md:flex gap-4">
            <div className="flex flex-col w-full gap-4">
              <div className="flex w-full flex-col md:flex-row md:flex gap-4">
                <div className="w-full">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={disabled}
                            placeholder="Name of your account"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled={disabled}
                            placeholder="Username"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setDebouncedUsername(e.target.value);
                            }}
                          />
                        </FormControl>
                        {usernameError && (
                          <FormMessage>{usernameError}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row md:flex gap-4">
                <div className="w-full">
                  <FormField
                    name="institution"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Name(Optional)</FormLabel>
                        <FormControl>
                          <Input
                            disabled={disabled}
                            placeholder="Name of your account"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    name="dateOfBirth"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col px-8 items-center justify-center">
              <div className="">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt="Uploaded"
                    className="rounded-md"
                    width={500}
                    height={500}
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/dffpxugiv/image/upload/v1724776426/jzhddhkr1aukun5ubsvi.jpg"
                    alt="Sample"
                    className="rounded-md"
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
            </div>
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input disabled={disabled} placeholder="Email" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="bkash"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bkash</FormLabel>
                <FormControl>
                  <Input disabled={disabled} placeholder="Bkash" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bkash_image_url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bkash Image URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Bkash Image URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.bkash_image_url?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="nagad"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nagad</FormLabel>
                <FormControl>
                  <Input disabled={disabled} placeholder="Nagad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nagad_image_url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nagad Image URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Nagad Image URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.nagad_image_url?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button>Check</Button>
        </form>
      </Form>
    </div>
  );
};
