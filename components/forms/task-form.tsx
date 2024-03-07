"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Product, Task } from "@prisma/client";
import { DashboardHeader } from "@/components/header";
import { taskCreateSchema } from "@/lib/validations/task";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
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
import { toast } from "@/components/ui/use-toast";
import { Icons } from "../icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  task: Task | null;
  products: Product[];
}

export const TaskForm: React.FC<ProductFormProps> = ({ task, products }) => {
  const mounted = useMounted();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof taskCreateSchema>>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      description: task?.description || "",
      scheduledAt: task?.scheduledAt,
      productId: task?.productId || "",
      status: task?.status || $Enums.Status.TODO,
      priority: task?.priority || $Enums.Priority.LOW,
    },
  });

  async function onClick(values: z.infer<typeof taskCreateSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/products");

    return toast({
      title: "Task Created Successfully.",
      description: "Your task was created , refer dashboard for future updates",
    });
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        heading="Task"
        text="Shedule new tasks or edit a exsisting one at one place."
      >
        <Button onClick={form.handleSubmit(onClick)}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </DashboardHeader>
      <Form {...form}>
        <form className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="spray on crops.." {...field} />
                </FormControl>
                <FormDescription>
                  This is your task description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Scheduled Date</FormLabel>
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
                        <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Your scheduled data</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.length ? (
                      products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no">No products to select</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      key={$Enums.Status.TODO}
                      value={$Enums.Status.TODO}
                    >
                      TODO
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Status.IN_PROGRESS}
                      value={$Enums.Status.IN_PROGRESS}
                    >
                      IN_PROGRESS
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Status.DONE}
                      value={$Enums.Status.DONE}
                    >
                      DONE
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>You can manage status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Privority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Privority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      key={$Enums.Priority.LOW}
                      value={$Enums.Priority.LOW}
                    >
                      LOW
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Priority.MEDIUM}
                      value={$Enums.Priority.MEDIUM}
                    >
                      MEDIUM
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Priority.HIGH}
                      value={$Enums.Priority.HIGH}
                    >
                      HIGH
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>You can manage privority</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
