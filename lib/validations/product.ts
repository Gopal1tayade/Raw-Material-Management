import * as z from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(3).max(120).optional(),
  color: z.string().min(3).max(32).optional(),
  weight: z.string().min(1).max(32).optional(),
  unit: z.string().min(1).max(4),
  cost: z.string().min(1).max(20).optional(),
  expirationDate: z.date().optional(),
  productionDate: z.date().optional(),
  isHazardous: z.boolean().default(false),
  isRecyclable: z.boolean().default(false),
  isOrganic: z.boolean().default(false),
});
