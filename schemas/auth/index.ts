import {z} from 'zod';
import type {Session} from "@supabase/supabase-js";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path:['confirmPassword']
})

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export type AuthResponse = {
    success: boolean;
    data: {
        user: {
            email: string;
            id: string;
        } | null;
        session: Session | null;
    };
};