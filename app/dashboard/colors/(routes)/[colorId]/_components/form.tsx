"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Color } from "@prisma/client";
import { Button } from "@/components/ui/button";
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
import { colorSchema } from "@/lib/validations/color";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

type ColorFormProps = {
  color: Color | null;
};

export const ColorForm: React.FC<ColorFormProps> = ({ color }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: color?.name || "",
      value: color?.value || "",
    },
  });

  async function onSubmit(values: z.infer<typeof colorSchema>) {
    setIsLoading(true);

    const response = await fetch(`/api/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your color was not created. Please try again.",
      });
    }

    const color = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/dashboard/colors`);

    return toast.success("Your color was created.", {
      description: "please check your dashboard for further updates.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="space-y-10"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Color Name"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your color identification .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Input
                      placeholder="Color Value"
                      className="max-w-[400px]"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className="size-8 rounded-full border"
                    style={{ background: field.value }}
                  />
                </div>
                <FormDescription>This is your color value.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-fit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
