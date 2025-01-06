import React from 'react'
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PersonalDetailsValues } from "@/schemas/onboarding";

const PersonalDetailsForm = () => {
    const {
        register,
        formState: { errors },
        setValue,
    } = useFormContext<PersonalDetailsValues>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue('imageUrl', file);
        }
    };

    return (
        <div className="space-y-4 text-start">
            <div className={'flex items-center gap-4 *:w-1/2'}>
                <div className="space-y-2">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-primary"
                    >
                        First Name
                    </label>
                    <Input
                        id="firstName"
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
                        htmlFor="lastName"
                        className="block text-sm font-medium text-primary"
                    >
                        Last Name
                    </label>
                    <Input
                        id="lastName"
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
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-primary"
                >
                    Profile Image (Optional)
                </label>
                <Input
                    id="imageUrl"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="block w-full p-2 border rounded-md hover:cursor-pointer"
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

export default PersonalDetailsForm;
