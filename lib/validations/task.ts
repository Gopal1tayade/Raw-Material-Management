import * as z from "zod";
import { $Enums } from "@prisma/client";

export const taskCreateSchema = z.object({
  title: z.string().min(3).max(120),
  scheduledAt: z.date(),
  productId: z.string().min(1).max(32),
  status: z.nativeEnum($Enums.Status),
  priority: z.nativeEnum($Enums.Priority),
});
