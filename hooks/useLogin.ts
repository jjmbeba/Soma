import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {loginSchema} from "@/schemas/auth";
import {signInAction} from "@/app/actions";
import {toast} from "sonner";

export const useLogin = () => {
    return useMutation({
        mutationKey:['users'],
        mutationFn:async (formData: z.infer <typeof loginSchema>) => signInAction(formData),
        onSuccess:() => {
            toast.success('Login successful')
        },
        onError:(err) => {
            toast.error(err.message)
            console.log(err)
        }
    })
}