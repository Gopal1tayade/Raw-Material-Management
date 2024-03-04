"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { $Enums, Color, Expense, Process } from "@prisma/client";
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
import { expenseCreateSchema } from "@/lib/validations/expense";
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

type ExpenseFormProps = {
  expense: Expense | null;
  processes: Process[];
};

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  processes,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof expenseCreateSchema>>({
    resolver: zodResolver(expenseCreateSchema),
    defaultValues: {
      description: expense?.description || "",
      amount: expense?.amount ? String(expense?.amount) : "0",
      date: expense?.date || new Date(),
      processId: expense?.processId || "",
      category: expense?.category || $Enums.ExpenseCategory.LABOR,
      paymentStatus: expense?.PaymentStatus,
    },
  });

  async function onSubmit(values: z.infer<typeof expenseCreateSchema>) {
    setIsLoading(true);

    const response = await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your expense was not created. Please try again.",
      });
    }

    const expense = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/dashboard/expenses`);

    return toast.success("Your expense was created.", {
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rubber Processing Expenses"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a description of the expense
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="3000"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Specify the amount of the expense.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense Note"
                    className="max-w-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Provide any additional notes related to the expense.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="processId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Process</FormLabel>
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
                    {processes &&
                      processes.map((process) => (
                        <SelectItem key={process.id} value={process.id}>
                          {process.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the process associated with the expense.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      key={$Enums.ExpenseCategory.LABOR}
                      value={$Enums.ExpenseCategory.LABOR}
                    >
                      LABOR
                    </SelectItem>
                    <SelectItem
                      key={$Enums.ExpenseCategory.EQUIPMENT}
                      value={$Enums.ExpenseCategory.EQUIPMENT}
                    >
                      EQUIPMENT
                    </SelectItem>
                    <SelectItem
                      key={$Enums.ExpenseCategory.SUPPLIES}
                      value={$Enums.ExpenseCategory.SUPPLIES}
                    >
                      SUPPLIES
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the category of the expense</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a paymentStatus" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      key={$Enums.PaymentStatus.PENDING}
                      value={$Enums.PaymentStatus.PENDING}
                    >
                      PENDING
                    </SelectItem>
                    <SelectItem
                      key={$Enums.PaymentStatus.COMPLETED}
                      value={$Enums.PaymentStatus.COMPLETED}
                    >
                      COMPLETED
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription> Select the payment status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
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
                <FormDescription>Pick the date of the expense.</FormDescription>
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
