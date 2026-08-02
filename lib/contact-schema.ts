import { z } from "zod";

const normalizedText = (min: number, max: number, field: string) =>
  z
    .string()
    .trim()
    .min(min, `${field} must be at least ${min} characters.`)
    .max(max, `${field} must be no more than ${max} characters.`);

export const contactSubjects = [
  "Job Opportunity",
  "Professional Networking",
  "Training Opportunity",
  "General Inquiry",
] as const;

export const contactSchema = z.object({
  name: normalizedText(2, 80, "Name"),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .max(24, "Phone number is too long.")
    .refine(
      (value) => value === "" || /^[+\d][\d\s()-]{6,23}$/.test(value),
      "Enter a valid phone number or leave this blank.",
    ),
  subject: z.enum(contactSubjects, { message: "Select an inquiry type." }),
  message: normalizedText(20, 2000, "Message"),
  consent: z.literal(true, { message: "Consent is required before sending." }),
  website: z.string().max(0, "Spam check failed."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
