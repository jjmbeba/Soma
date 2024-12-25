"use client";

import {cn, generateSubmitAction} from "@/lib/utils"
import {registerSchema} from "@/schemas/auth";
import {useCustomForm} from "@/hooks/useCustomForm";
import {Form} from "@/components/ui/form";
import FormHeader from "@/app/components/auth/FormHeader";
import AuthAlternative from "@/app/components/auth/AuthAlternative";
import CustomInputFormField from "@/app/components/forms/custom-input-form-field";
import SubmitButton from "@/app/components/forms/SubmitButton";
import {useRegister} from "@/hooks/useRegister";

export function RegisterForm() {
    const {mutate, isPending} = useRegister();
    const form = useCustomForm(registerSchema, {
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onSubmit = generateSubmitAction({
        schema: registerSchema,
        action: mutate
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
                <FormHeader title={'Register for a new account'}
                            description={'Enter your email and password to continue'}/>
                <div className="grid gap-6">
                    <CustomInputFormField isSubmitPending={isPending} form={form} name={'email'} label={'Email'} placeholder={'johndoe@email.com'}/>
                    <CustomInputFormField isSubmitPending={isPending} form={form} name={'password'} label={'Password'} inputType={'password'}/>
                    <CustomInputFormField isSubmitPending={isPending} form={form} name={'confirmPassword'} label={'Confirm Password'} inputType={'password'}/>
                    <SubmitButton isSubmitPending={isPending} text={'Register'}/>
                </div>
                <AuthAlternative currentForm={'Register'}/>
            </form>
        </Form>
    )
}
