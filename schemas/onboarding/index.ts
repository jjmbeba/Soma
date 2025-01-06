import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const personalDetailsSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    imageUrl: z.union([
        z.string().url("Invalid URL"),
        z.instanceof(File)
            .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 4MB.`)
            .refine(
                (file) => ACCEPTED_FILE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
            )
    ]).optional(),
});

export const childrenDetailSchema = z.object({
    children: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        dob: z.date({
            required_error: "Date of birth is required",
            invalid_type_error: "That's not a valid date",
        }),
        class: z.string()
    }))
});

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
export type ChildrenDetailsValues = z.infer<typeof childrenDetailSchema>;

export const completeSchema = z.object({});

export type CompleteValues = z.infer<typeof completeSchema>;

export type StepperSchema = [
    { id: "personal"; label: "Personal Details"; schema: typeof personalDetailsSchema },
    { id: "children"; label: "Children Details"; schema: typeof childrenDetailSchema },
    { id: "complete"; label: "Complete"; schema: typeof completeSchema }
];