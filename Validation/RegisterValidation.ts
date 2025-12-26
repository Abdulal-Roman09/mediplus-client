import z from "zod";

export const RegisterSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

  patient: z.object({
    name: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
  }),
});