import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {z} from "zod";

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

export function generateSubmitAction(schema: z.ZodSchema) {
    return (values: z.infer<typeof schema>) => {
        console.log(values);
    }
}