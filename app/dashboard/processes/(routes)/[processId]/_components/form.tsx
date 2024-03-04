"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { $Enums, Color, Expense, Process, Product } from "@prisma/client";
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
import { processCreateSchema } from "@/lib/validations/process";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProcessFormProps = {
  process: Process | null;
  products: Product[];
};

export const ProcessForm: React.FC<ProcessFormProps> = ({
  process,
  products,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof processCreateSchema>>({
    resolver: zodResolver(processCreateSchema),
    defaultValues: {
      name: process?.name || "",
      description: process?.description || "",
      duration: process?.duration ? String(process?.duration) : "0",
      temperature: process?.temperature ? String(process?.temperature) : "0",
      humidity: process?.humidity ? String(process?.humidity) : "0",
      pressure: process?.pressure ? String(process?.pressure) : "0",
      status: process?.status || $Enums.Status.TODO,
      productId: process?.productId || "",
      startDate: process?.startDate || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof processCreateSchema>) {
    setIsLoading(true);

    const response = await fetch(`/api/processes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your process was not created. Please try again.",
      });
    }

    const process = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/dashboard/processes`);

    return toast.success("Your process was created.", {
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
                    placeholder="Rubber Processing"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the name of the manufacturing process</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Advanced process to refine natural rubber"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Briefly describe the process
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
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
                <FormDescription> Choose the start date of the process.</FormDescription>
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
                <FormDescription>Select the status of the process</FormDescription>
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
                    {products &&
                      products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the product associated with the process.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Color Value"
                    className="max-w-[400px]"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the required temperature for the process.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense Note"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Specify the duration of the process in hours.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="humidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Humidity (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense Note"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription> Enter the required humidity for the process.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pressure (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense Note"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription> Enter the required pressure for the process.</FormDescription>
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
