"use client";
import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertFundsSchema } from "@/db/schema";
import { ImageUpload } from "@/components/imgae-upload";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = insertFundsSchema.pick({
  name: true,
  description: true,
  amount: true,
  about: true,
  photoUrl: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const FundForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };
  const handleImageUploadSuccess = (url: string) => {
    form.setValue("photoUrl", url);
    console.log(url);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <div className="flex justify-center">
          <div className="w-full pl-10 pt-10">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="pt-10">
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder="Name of your fund"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-8">
            <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
          </div>
        </div>
      </form>
    </Form>
  );
};
