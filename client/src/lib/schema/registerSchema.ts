// src/lib/schema/registerSchema.ts
import { z } from "zod";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .regex(passwordValidation, {
      message:
        "Password must be 6–10 chars, include upper, lower, number, and special char.",
    }),
    
});

export type RegisterSchema = z.infer<typeof registerSchema>;