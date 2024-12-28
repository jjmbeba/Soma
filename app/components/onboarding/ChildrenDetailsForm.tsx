import React from 'react'
import {Controller, useFieldArray, useFormContext} from "react-hook-form"
import {ChildrenDetailsValues} from "@/schemas/onboarding"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {PlusCircle, Trash2} from 'lucide-react'
import {DateTimePicker} from '@/components/ui/datetime-picker';
import {useClasses} from "@/hooks/useClasses";
import {AutoComplete, Option} from "@/components/ui/autocomplete";

const ChildrenDetailsForm = () => {
    const {
        register,
        control,
        formState: {errors}
    } = useFormContext<ChildrenDetailsValues>()

    const {fields, append, remove} = useFieldArray({
        control,
        name: "children"
    });

    const {data: classes, isLoading: isFetchClassesLoading, error} = useClasses();

    const classOptions: Option[] = classes ? classes.map(c => ({
        value: c.id,
        label: c.name
    })) : [];

    return (
        <div className="space-y-6">
            {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => remove(index)}
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                    <div>
                        <Label htmlFor={`children.${index}.name`}>Name</Label>
                        <Input
                            {...register(`children.${index}.name`)}
                            id={`children.${index}.name`}
                            placeholder="Child's name"
                        />
                        {errors.children?.[index]?.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.children[index]?.name?.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor={`children.${index}.dob`}>Date of Birth</Label>
                        <Controller
                            control={control}
                            name={`children.${index}.dob`}
                            render={({field}) => (
                                <DateTimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    hideTime={true}
                                    clearable={true}
                                    max={new Date()}
                                />
                            )}
                        />
                        {errors.children?.[index]?.dob && (
                            <p className="text-sm text-red-500 mt-1">{errors.children[index]?.dob?.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor={`children.${index}.class`}>Class</Label>
                        <Controller
                            control={control}
                            name={`children.${index}.class`}
                            render={({field}) => {
                                console.log(field.value)
                                return (
                                    //Render Autocomplete here
                                    <AutoComplete
                                        options={classOptions}
                                        value={classOptions.find((c) => c.value === field.value) || undefined}
                                        onValueChange={(option) => field.onChange(option.value || '')}
                                        disabled={isFetchClassesLoading}
                                        isLoading={isFetchClassesLoading}
                                        placeholder="Select a class"
                                        emptyMessage="No classes found"
                                    />
                                )
                            }}
                        />
                        {errors.children?.[index]?.class && (
                            <p className="text-sm text-red-500 mt-1">{errors.children[index]?.class?.message}</p>
                        )}
                    </div>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                onClick={() => append({name: '', dob: new Date(), class: ''})}
                className="w-full"
            >
                <PlusCircle className="mr-2 h-4 w-4"/> Add Child
            </Button>
        </div>
    )
}

export default ChildrenDetailsForm

