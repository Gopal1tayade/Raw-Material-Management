import * as z from "zod";

export const colorSchema = z.object({
  name: z.string().min(3).max(32),
  value: z.string().min(1).max(10),
});

export const colorEditSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  value: z.string().min(1).max(10).optional(),
});
