import * as z from "zod";
import { $Enums } from "@prisma/client";

export const processCreateSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(120),
  startDate: z.date(),
  status: z.nativeEnum($Enums.Status),
  productId: z.string().min(1),
  duration: z.number().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  pressure: z.number().optional(),
});
