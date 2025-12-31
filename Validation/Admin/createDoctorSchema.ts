import { z } from "zod";

export const doctorValidationSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),

  profilePhoto: z
    .any()
    .refine((file) => file, {
      message: "Profile photo is required",
    }),

  doctor: z.object({
    name: z
      .string()
      .min(1, "Doctor name is required"),

    email: z
      .string()
      .email("Please provide a valid email address"),

    contactNumber: z
      .string()
      .min(9, "Contact number must be at least 9 digits")
      .max(11, "Contact number must not exceed 11 digits"),

    address: z
      .string()
      .min(1, "Address is required"),

    registrationNumber: z
      .string()
      .min(5, "Registration number is required"),

    experience: z
      .coerce
      .number()
      .min(0, "Experience cannot be negative"),

    gender: z.enum(["MALE", "FEMALE"], {
      message: "Please select a gender",
    }),

    appointmentFee: z
      .coerce
      .number()
      .min(1, "Appointment fee must be greater than 0"),

    qualification: z
      .string()
      .min(1, "Qualification is required"),

    currentWorkingPlace: z
      .string()
      .min(1, "Current working place is required"),

    designation: z
      .string()
      .min(1, "Designation is required"),
  }),
});
