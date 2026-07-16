import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name cannot exceed 30 characters"),

  keyboard: z
    .string()
    .trim()
    .min(2, "Keyboard is required"),
    
  bio: z
    .string()
    .trim()
    .min(5, "Bio must be at least 5 characters")
    .max(250, "Bio cannot exceed 250 characters"),

  country: z
    .string()
    .trim()
    .min(2, "Country is required"),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  organization: z
    .string()
    .trim()
    .min(2, "Organization is required"),
});

// Automatically infer the TypeScript type
export type EditProfileFormData = z.infer<typeof editProfileSchema>;