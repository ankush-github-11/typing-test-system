import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name cannot exceed 30 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name cannot exceed 30 characters"),

  keyboard: z
    .string()
    .trim()
    .min(2, "Keyboard is required"),
    
  bio: z
    .string()
    .trim()
    .min(10, "Bio is required")
    .max(250, "Bio cannot exceed 250 characters"),

  country: z
    .string()
    .trim()
    .min(2, "Country is required"),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  institution: z
    .string()
    .trim()
    .min(2, "Institution is required"),
});

// Automatically infer the TypeScript type
export type EditProfileFormData = z.infer<typeof editProfileSchema>;