import * as z from "zod";

export const taskCreateSchema = z.object({
  description: z.string().min(3).max(120),
  scheduledAt: z.date(),
  productId: z.string().min(1).max(32),
});
