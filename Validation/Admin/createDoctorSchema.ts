import { z } from "zod";

export const doctorValidationSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  profilePhoto: z.any().optional(),
  doctor: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    contactNumber: z.string().min(1, "Contact number is required"),
    address: z.string().min(1, "Address is required"),
    registrationNumber: z.string().min(1, "Registration is required"), 
    experience: z.coerce.number().min(0),
    gender: z.enum(["MALE", "FEMALE"]),
    appointmentFee: z.coerce.number().min(1),
    qualification: z.string().min(1, "Qualification is required"),
    currentWorkingPlace: z.string().min(1, "Current working place is required"),
    designation: z.string().min(1, "Designation is required"),
  }),
});