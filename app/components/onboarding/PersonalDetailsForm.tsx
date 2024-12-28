import React from 'react'
import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {PersonalDetailsValues} from "@/schemas/onboarding";

const PersonalDetailsForm = () => {
    const {
        register,
        formState: {errors},
    } = useFormContext<PersonalDetailsValues>();

    return (
        <div className="space-y-4 text-start">
            <div className={'flex items-center gap-4 *:w-1/2'}>
                <div className="space-y-2">
                    <label
                        htmlFor={register('firstName').name}
                        className="block text-sm font-medium text-primary"
                    >
                        First Name
                    </label>
                    <Input
                        id={register('firstName').name}
                        {...register('firstName')}
                        className="block w-full p-2 border rounded-md"
                        placeholder={'John'}
                    />
                    {errors.firstName && (
                        <span className="text-sm text-destructive">
            {errors.firstName.message}
          </span>
                    )}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor={register('lastName').name}
                        className="block text-sm font-medium text-primary"
                    >
                        Last Name
                    </label>
                    <Input
                        id={register('lastName').name}
                        {...register('lastName')}
                        className="block w-full p-2 border rounded-md"
                        placeholder={'Doe'}
                    />
                    {errors.lastName && (
                        <span className="text-sm text-destructive">
            {errors.lastName.message}
          </span>
                    )}
                </div>
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={register('imageUrl').name}
                    className="block text-sm font-medium text-primary"
                >
                    Image Url (Optional)
                </label>
                <Input
                    id={register('imageUrl').name}
                    {...register('imageUrl')}
                    type={'file'}
                    multiple={false}
                    className="block w-full p-2 border rounded-md"
                />

                {errors.imageUrl && (
                    <span className="text-sm text-destructive">
            {errors.imageUrl.message}
          </span>
                )}
            </div>
        </div>
    );
}
export default PersonalDetailsForm
