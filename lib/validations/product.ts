import * as z from "zod";
import { $Enums } from "@prisma/client";

export const productCreateSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(3).max(120).optional(),
  colorId: z.string().min(3).max(32),
  weight: z.string().min(1).max(32).optional(),
  unit: z.nativeEnum($Enums.Units),
  cost: z.string().min(1).max(20),
  expirationDate: z.date().optional(),
  productionDate: z.date().optional(),
  isHazardous: z.boolean().default(false),
  isRecyclable: z.boolean().default(false),
  isOrganic: z.boolean().default(false),
});
