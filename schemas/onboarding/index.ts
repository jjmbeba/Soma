import {z} from "zod";

export const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const personalDetailsSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters"
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters"
    }),
    imageUrl:  z.custom<FileList>()
        .refine((files) => {
            return files instanceof FileList;
        }, "Please provide a valid file input")
        .refine((files) => {
            return files.length === 0 || files.length === 1;
        }, "Please upload only one file")
        .refine((files) => {
            if (files.length === 0) return true;
            const file = files[0];
            return file.size <= MAX_FILE_SIZE;
        }, `File size should be less than 5MB.`)
        .refine((files) => {
            if (files.length === 0) return true;
            const file = files[0];
            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
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
})

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
export type ChildrenDetailsValues = z.infer<typeof childrenDetailSchema>;