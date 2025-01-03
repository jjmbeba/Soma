"use client";

import {cn, generateSubmitAction} from "@/lib/utils"
import Link from "next/link";
import {loginSchema} from "@/schemas/auth";
import {Form,} from "@/components/ui/form"
import {useCustomForm} from "@/hooks/useCustomForm";
import AuthAlternative from "@/app/components/auth/AuthAlternative";
import FormHeader from "@/app/components/auth/FormHeader";
import CustomInputFormField from "@/app/components/forms/custom-input-form-field";
import SubmitButton from "@/app/components/forms/SubmitButton";
import {useLogin} from "@/hooks/useLogin";

export function LoginForm() {
    const {mutate, isPending} = useLogin();
    const form = useCustomForm(loginSchema, {
        email: "",
        password: ""
    });

    const onSubmit = generateSubmitAction({
        schema: loginSchema,
        action: mutate
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
                <FormHeader title={'Login to your account'} description={'Enter your email and password to continue'}/>
                <div className="grid gap-6">
                    <CustomInputFormField isSubmitPending={isPending} form={form} name={'email'} label={'Email'}
                                          placeholder={'johne@email.com'}/>
                    <CustomInputFormField isSubmitPending={isPending} form={form} name={'password'} label={'Password'}
                                          inputType={'password'}
                                          labelSibling={(
                                              <Link href={'/forgot-password'} className="underline underline-offset-4">
                                                  Forgot your password?
                                              </Link>
                                          )}/>
                    <SubmitButton isSubmitPending={isPending} text={'Login'}/>
                </div>
                <AuthAlternative currentForm={'Login'}/>
            </form>
        </Form>
    )
}
