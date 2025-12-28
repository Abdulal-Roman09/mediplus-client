import z from "zod";

export const specialtySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  file: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Please upload a valid file"
    ),
});