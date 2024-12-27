import {z} from "zod";

export const personalDetailsSchema = z.object({
    firstName: z.string().min(2, {
        message:"First name must be at least 2 characters"
    }),
    lastName: z.string().min(2, {
        message:"Last name must be at least 2 characters"
    }),
    imageUrl: z.string().optional(),
});

export const childrenDetailSchema = z.object({
    children: z.array(z.object({
        name: z.string(),
        age: z.number(),
        class: z.string()
    }))
})

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
export type ChildrenDetailsValues = z.infer<typeof childrenDetailSchema>;