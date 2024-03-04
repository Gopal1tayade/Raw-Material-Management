import * as z from "zod";
import { $Enums } from "@prisma/client";

export const expenseCreateSchema = z.object({
  description: z.string().min(3).max(120),
  date: z.date(),
  amount: z.number(),
  category: z.nativeEnum($Enums.ExpenseCategory),
  paymentStatus: z.nativeEnum($Enums.PaymentStatus),
  notes: z.string(),
  processId: z.string().min(1),
});
