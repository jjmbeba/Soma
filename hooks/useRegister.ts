import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {registerSchema} from "@/schemas/auth";
import {signUpAction} from "@/app/actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export const useRegister = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey:['users'],
        mutationFn:async (formData: z.infer<typeof registerSchema>) => signUpAction(formData),
        onSuccess:(data) => {
            toast.success('Registration successful')
            queryClient.invalidateQueries({
                queryKey:['users']
            });

            router.push('/dashboard');

        },
        onError:(err) => {
            toast.error(err.message)
            console.log(err.stack)
        }
    })
}