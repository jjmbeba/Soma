import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {registerSchema} from "@/schemas/auth";
import {signUpAction} from "@/app/actions";
import {toast} from "sonner";

export const useRegister = () => {
    const {invalidateQueries} = useQueryClient();

    return useMutation({
        mutationKey:['users'],
        mutationFn:async (formData: z.infer<typeof registerSchema>) => signUpAction(formData),
        onSuccess:() => {
            toast.success('Registration successful')
        },
        onError:(err) => {
            toast.error(err.message)
        },
        onMutate:() => {
            invalidateQueries({
                queryKey:['users']
            });
        }
    })
}