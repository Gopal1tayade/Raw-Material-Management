"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { $Enums, Product, Task } from "@prisma/client";
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
import { taskCreateSchema } from "@/lib/validations/task";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type TaskFormProps = {
  task: Task | null;
  products: Product[];
};

export const TaskForm: React.FC<TaskFormProps> = ({ task, products }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof taskCreateSchema>>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: task?.title || "",
      productId: task?.productId || "",
      priority: task?.priority || $Enums.Priority.LOW,
      status: task?.status || $Enums.Status.TODO,
      scheduledAt: task?.scheduledAt || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof taskCreateSchema>) {
    setIsLoading(true);

    const response = await fetch(`/api/Tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your Task was not created. Please try again.",
      });
    }

    const Task = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/dashboard/tasks`);

    return toast.success("Your Task was created.", {
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Task Title"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your Task identification.
                </FormDescription>
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
                      <SelectValue placeholder="Select a process" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products &&
                      products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>Choose Your Products</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
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
                <FormDescription>choose priority of the task.</FormDescription>
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
                      IN PROGRESS
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Status.DONE}
                      value={$Enums.Status.DONE}
                    >
                      DONE
                    </SelectItem>
                    <SelectItem
                      key={$Enums.Status.CANCELED}
                      value={$Enums.Status.CANCELED}
                    >
                      CANCELED
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>choose priority of the task.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
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
                <FormDescription>Your expense data</FormDescription>
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
