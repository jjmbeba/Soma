import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {loginSchema} from "@/schemas/auth";
import {signInAction} from "@/app/actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationKey:['users'],
        mutationFn:async (formData: z.infer <typeof loginSchema>) => signInAction(formData),
        onSuccess:(data) => {
            toast.success('Login successful')
            router.push('/dashboard');
        },
        onError:(err) => {
            toast.error(err.message)
            console.log(err)
        }
    })
}