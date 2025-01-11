import {z} from "zod";

export const profileFormSchema = z.object({
    first_name: z.string().nonempty(),
    last_name: z.string().nonempty(),
    email: z.string().email(),
    profile_image_url: z.string().optional()
})