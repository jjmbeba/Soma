import {MutationKey, useMutation} from "@tanstack/react-query";
import {z, ZodSchema} from "zod";
import {toast} from "sonner";

type Props = {
    mutationKey: MutationKey,
    schema: ZodSchema,
    endpoint:string,
    errorMessage?: string,
    successMessage?: string,
    onSuccessAction: () => void,
}

export const usePostOnboarding = ({mutationKey, schema, endpoint, errorMessage, successMessage, onSuccessAction}:Props) => {
    return useMutation({
        mutationKey: mutationKey,
        mutationFn: async (values: z.infer<typeof schema>) => {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse?.error || errorMessage);
            }

            return jsonResponse;
        },
        onError:(error) => {
            toast.error(error.message)
            console.error(error)
        },
        onSuccess:() => {
            toast.success(successMessage)
            onSuccessAction()
        }
    })
}