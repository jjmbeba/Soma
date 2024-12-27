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

type GenerateSubmitActionProps<
    T extends z.ZodSchema,
    TResponse = any, // The response type from the mutation
    TInput = z.infer<T> // The input type derived from the schema
> = {
    schema: T;
    action: UseMutateFunction<TResponse, Error, TInput, unknown>;
};

export function generateSubmitAction<
    T extends z.ZodSchema,
    TResponse = any
>({
      schema,
      action,
  }: GenerateSubmitActionProps<T, TResponse>) {
    return (values: z.infer<T>) => {
        const parsedValues = schema.parse(values);
        return action(parsedValues);
    };
}

export function generateAvatarFallback(fullName:string){
    const [firstName, lastName] = fullName.split(" ");
    return `${firstName[0]}${lastName[0]}`;
}