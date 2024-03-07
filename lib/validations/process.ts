import * as z from "zod";
import { $Enums } from "@prisma/client";

export const processCreateSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(120),
  startDate: z.coerce.date(),
  status: z.nativeEnum($Enums.Status),
  productId: z.string().min(1),
  duration: z.string().optional(),
  temperature: z.string().optional(),
  humidity: z.string().optional(),
  pressure: z.string().optional(),
});
