import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export function useCustomForm(schema: z.ZodSchema, defaultValues: z.infer<typeof schema> = {}) {
    return useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues
    })
}