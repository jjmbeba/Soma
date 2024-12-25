import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {z} from "zod";
import type {UseMutateFunction} from "@tanstack/react-query"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function checkIfUserIsSignedIn(supabase: Awaited<ReturnType<typeof createClient>>) {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    return !!user;
}

export function redirectBasedOnUserStatus(isUserSignedIn: boolean) {
    if (!isUserSignedIn) {
        return redirect("/sign-in");
    }
}

type GenerateSubmitActionProps<T extends z.ZodSchema, TInput> = { schema: T, action: UseMutateFunction <never, Error, TInput, unknown> }

export function generateSubmitAction<T extends z.ZodSchema>({schema, action}: GenerateSubmitActionProps<T, z.infer<T>>) {
    return (values: z.infer<T>) => {
        const parsedValues = schema.parse(values);
        return action( parsedValues);
    }
}

export function generateAvatarFallback(fullName:string){
    const [firstName, lastName] = fullName.split(" ");
    return `${firstName[0]}${lastName[0]}`;
}