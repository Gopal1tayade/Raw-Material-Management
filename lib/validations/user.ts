import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const userAddressSchema = z.object({
  street: z.string().min(3).max(32),
  city: z.string().min(3).max(32),
  state: z.string().min(3).max(32),
  postalCode: z.string().min(6).max(6),
});
