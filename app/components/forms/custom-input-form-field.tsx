import React from 'react'
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";

type Props = {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    inputType?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    labelSibling?: React.ReactNode;
}

const CustomInputFormField = ({form, label, name, inputType = 'text', placeholder = '', labelSibling}: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className={'grid gap-2'}>
                    <div className={'flex items-center justify-between'}>
                        <FormLabel>
                            {label}
                        </FormLabel>
                        <FormDescription>
                            {labelSibling ?? ''}
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Input placeholder={placeholder} type={inputType} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
export default CustomInputFormField