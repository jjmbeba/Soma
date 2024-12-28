"use server";

import {encodedRedirect} from "@/utils/utils";
import {createClient} from "@/utils/supabase/server";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";
import {loginSchema, registerSchema} from "@/schemas/auth";
import {prisma} from "@/utils/prisma";

export const signUpAction = async (formData: z.infer<typeof registerSchema>) => {
    const {email, password} = formData;
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Email and password are required",
        );
    }

    const {error, data} = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        throw new Error(error.message)
    }

    return {success: true, data};
};

export const signInAction = async (formData: z.infer<typeof loginSchema>) => {
    const {password, email} = formData;
    const supabase = await createClient();

    const {error, data} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message)
    }

    return {success: true, data};
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect("error", "/forgot-password", "Email is required");
    }

    const {error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/forgot-password",
            "Could not reset password",
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        "/forgot-password",
        "Check your email for a link to reset your password.",
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Passwords do not match",
        );
    }

    const {error} = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password update failed",
        );
    }

    encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/sign-in");
};

export const getUser = async () => {
    const supabase = await createClient();
    return supabase.auth.getUser();
}

export const getUserProfile = async () => {
    const {data: {user}} = await getUser();
    if (!user?.id) {
        return null;
    }

    return prisma.profiles.findFirst({
        where: {
            id: user.id
        }
    });
}