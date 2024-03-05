"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as dbUser } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAddressSchema } from "@/lib/validations/user";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormData = z.infer<typeof userAddressSchema>;

interface User extends dbUser {
  address?: FormData | null;
}

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "address">;
}

export function UserAddressForm({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(userAddressSchema),
    defaultValues: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user.id}/address`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
      }),
    });

    console.log(response);

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your Address has been updated.",
    });

    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Address</CardTitle>
            <CardDescription>
              Please enter your full address it will help in export and shipping
              process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="w-full grid sm:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        id="state"
                        size={32}
                        placeholder="Enter your state"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Select the state where you are located.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City or Locality</FormLabel>
                    <FormControl>
                      <Input
                        id="city"
                        size={32}
                        placeholder="Enter your city or locality"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify the city or locality within the selected state.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input
                        id="street"
                        size={32}
                        placeholder="Enter your street address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your street address, including house/flat number and
                      any additional details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        id="postalCode"
                        size={32}
                        placeholder="Enter your postal code"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the postal code for accurate delivery.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className={className} disabled={isSaving}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
